<?php
/**
 * Formularz kontaktowy Maxsoft – wysyłka przez SMTP (nie mail()).
 * Config: /var/www/html/maxsoft.pl/config/smtp.php  (POZA document root)
 * Szablon: deploy/nginx/smtp.php.example
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Metoda niedozwolona.']);
    exit;
}

$configPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/config/smtp.php';
if (!is_readable($configPath)) {
    // fallback: katalog obok www na typowej strukturze Maxsoft
    $configPath = '/var/www/html/maxsoft.pl/config/smtp.php';
}
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode(['message' => 'Brak konfiguracji SMTP na serwerze.']);
    exit;
}

/** @var array{host:string,port:int,user:string,pass:string,from:string,to:string,secure?:string} $smtp */
$smtp = require $configPath;

$name = trim((string) ($_POST['name'] ?? ''));
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || !$email || $message === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Brak wymaganych danych (Imię, E-mail, Wiadomość).']);
    exit;
}

$nameEsc = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$emailEsc = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$subjectEsc = htmlspecialchars($subject !== '' ? $subject : 'Brak tematu', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$messageEsc = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

$mailSubject = '[Maxsoft Formularz] ' . ($subject !== '' ? $subject : 'Brak tematu');
$bodyHtml = "<p>Imię i Nazwisko: <strong>{$nameEsc}</strong></p>"
    . "<p>E-mail: <strong>{$emailEsc}</strong></p>"
    . "<p>Temat: <strong>{$subjectEsc}</strong></p>"
    . '<p>Treść wiadomości:</p>'
    . "<p>{$messageEsc}</p>";

try {
    smtp_send($smtp, [
        'to' => $smtp['to'],
        'from' => $smtp['from'],
        'from_name' => 'Formularz Maxsoft',
        'reply_to' => $email,
        'subject' => $mailSubject,
        'html' => $bodyHtml,
    ]);
    http_response_code(200);
    echo json_encode(['message' => 'Wiadomość została wysłana!']);
} catch (Throwable $e) {
    error_log('Maxsoft SMTP: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['message' => 'Błąd: Nie udało się wysłać e-maila (SMTP).']);
}

/**
 * Minimalny klient SMTP (AUTH LOGIN + STARTTLS na 587 lub SSL na 465).
 *
 * @param array{host:string,port:int,user:string,pass:string,secure?:string} $cfg
 * @param array{to:string,from:string,from_name:string,reply_to:string,subject:string,html:string} $mail
 */
function smtp_send(array $cfg, array $mail): void
{
    $host = $cfg['host'];
    $port = (int) $cfg['port'];
    $secure = strtolower((string) ($cfg['secure'] ?? 'tls'));
    // secure=true / ssl → ssl:// ; false/tls → STARTTLS po połączeniu plaintext
    $useSsl = in_array($secure, ['1', 'true', 'ssl'], true);
    $useStartTls = !$useSsl && $port !== 465;

    $remote = ($useSsl ? 'ssl://' : '') . $host . ':' . $port;
    $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$fp) {
        throw new RuntimeException("Połączenie SMTP: $errstr ($errno)");
    }
    stream_set_timeout($fp, 20);

    smtp_expect($fp, [220]);
    smtp_cmd($fp, 'EHLO maxsoft.pl', [250]);

    if ($useStartTls) {
        smtp_cmd($fp, 'STARTTLS', [220]);
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('STARTTLS nieudane');
        }
        smtp_cmd($fp, 'EHLO maxsoft.pl', [250]);
    }

    smtp_cmd($fp, 'AUTH LOGIN', [334]);
    smtp_cmd($fp, base64_encode($cfg['user']), [334]);
    smtp_cmd($fp, base64_encode($cfg['pass']), [235]);

    smtp_cmd($fp, 'MAIL FROM:<' . $mail['from'] . '>', [250]);
    smtp_cmd($fp, 'RCPT TO:<' . $mail['to'] . '>', [250, 251]);
    smtp_cmd($fp, 'DATA', [354]);

    $headers = [
        'Date: ' . date('r'),
        'From: ' . smtp_encode_address($mail['from_name'], $mail['from']),
        'To: <' . $mail['to'] . '>',
        'Reply-To: <' . $mail['reply_to'] . '>',
        'Subject: ' . smtp_encode_header($mail['subject']),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];

    $data = implode("\r\n", $headers) . "\r\n\r\n"
        . chunk_split(base64_encode($mail['html'])) . "\r\n.";

    fwrite($fp, $data . "\r\n");
    smtp_expect($fp, [250]);
    smtp_cmd($fp, 'QUIT', [221]);
    fclose($fp);
}

/** @param resource $fp @param list<int> $ok */
function smtp_cmd($fp, string $cmd, array $ok): void
{
    fwrite($fp, $cmd . "\r\n");
    smtp_expect($fp, $ok);
}

/** @param resource $fp @param list<int> $ok */
function smtp_expect($fp, array $ok): void
{
    $response = '';
    while (($line = fgets($fp, 512)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $ok, true)) {
        throw new RuntimeException('SMTP odpowiedź: ' . trim($response));
    }
}

function smtp_encode_header(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

function smtp_encode_address(string $name, string $email): string
{
    return smtp_encode_header($name) . ' <' . $email . '>';
}
