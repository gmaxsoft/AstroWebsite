/** Fragment wpisu z tablicy `projekt` w pl.json / en.json (meta + galeria). */
export type ProjectJson = {
  slug: string;
  title: string;
  content: string;
  projekttxt07: string;
  number: string;
};

/** Usuwa znaczniki HTML (krótki opis pod meta description). */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getProjectPageTitle(
  projectTitle: string,
  projectsSectionLabel: string,
): string {
  return `${projectTitle} | ${projectsSectionLabel} – Maxsoft`;
}

export function getProjectMetaDescription(project: ProjectJson): string {
  const fromContent = stripHtml(project.content || "");
  const tech = (project.projekttxt07 || "").replace(/\s+/g, " ").trim();
  let text =
    fromContent.length >= 45
      ? fromContent
      : [project.title, tech].filter(Boolean).join(". ");
  if (text.length > 160) {
    text = `${text.slice(0, 157).trimEnd()}…`;
  }
  return text;
}

export function getProjectOgImagePath(projectNumber: string): string {
  return `/img/works/${projectNumber}/1.webp`;
}
