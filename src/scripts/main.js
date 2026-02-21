// src/scripts/main.js - Bez GSAP (lepsze SEO, zaznaczalny tekst)
import $ from 'jquery';
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import Swiper from 'swiper';
import { Navigation, Pagination, FreeMode, Thumbs, Mousewheel, Autoplay, Parallax, EffectFade, Scrollbar } from 'swiper/modules';

/**
 * Inicjalizuje animację Preloadera (sekwencja: 3 linie → maxsoft.pl z reveal → fade out).
 */
function initPreloader() {
    const $preloader = $('.mil-preloader');
    if (!$preloader.length) return;
    $('.mil-progress').hide();
    if ($preloader.hasClass('mil-hidden')) return;

    const $anim = $('.mil-preloader-animation');
    const $phase1 = $('.mil-animation-1');
    const $phase2 = $('.mil-animation-2');

    // Faza 1: Pokaż kontener i animację 1 (3 linie z efektem stagger)
    $anim.addClass('mil-visible');
    $phase1.addClass('mil-visible');

    // Faza 2: Po ~1.2s przełącz na animację 2 (maxsoft.pl z reveal box)
    setTimeout(() => {
        $anim.addClass('mil-phase-2');
        $phase1.removeClass('mil-visible');
        $phase2.addClass('mil-visible');
    }, 1200);

    // Faza 3: Po ~2.4s fade out preloadera
    setTimeout(() => {
        $preloader.css('opacity', '0');
        setTimeout(() => {
            $preloader.addClass('mil-hidden');
        }, 800);
    }, 2400);
}

/**
 * Smooth scroll do kotwic (natywny API).
 */
function initAnchorScroll() {
    $(document).off('click', 'a[href^="#"]').on('click', 'a[href^="#"]', function (event) {
        const target = $(this).attr('href');
        if (target === '#' || !target) return;
        const $target = $(target);
        if ($target.length) {
            event.preventDefault();
            $('.mil-progress').show();
            const offset = $(window).width() < 1200 ? 90 : 0;
            const top = $target.offset().top - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
}

/**
 * Klonuje i dodaje elementy DOM.
 */
function initAppendElements() {
    $(".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron, .mil-current-page a").remove();
    $(".mil-arrow").clone().appendTo(".mil-arrow-place");
    $(".mil-dodecahedron").clone().appendTo(".mil-animation");
    $(".mil-lines").clone().appendTo(".mil-lines-place");
    $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
}

/**
 * Inicjalizuje akordeon (bez GSAP).
 */
function initAccordion() {
    const groups = document.querySelectorAll(".mil-accordion-group");
    if (groups.length === 0) return;

    groups.forEach((group) => {
        const menu = group.querySelector(".mil-accordion-menu");
        const content = group.querySelector(".mil-accordion-content");
        if (!menu || !content) return;

        content.style.transition = 'height 0.4s ease';

        $(menu).off('click').on('click', () => {
            const isOpen = group.classList.contains('mil-open');
            groups.forEach((g) => {
                const c = g.querySelector(".mil-accordion-content");
                const minusEl = g.querySelector(".mil-minus");
                const plusEl = g.querySelector(".mil-plus");
                const sym = g.querySelector(".mil-symbol");
                g.classList.remove('mil-open');
                if (c) c.style.height = '0';
                if (minusEl) minusEl.style.opacity = '0';
                if (plusEl) plusEl.style.opacity = '1';
                if (sym) sym.style.background = '';
            });
            if (!isOpen) {
                group.classList.add('mil-open');
                content.style.height = content.scrollHeight + 'px';
                const minusEl = group.querySelector(".mil-minus");
                const plusEl = group.querySelector(".mil-plus");
                const sym = group.querySelector(".mil-symbol");
                if (minusEl) minusEl.style.opacity = '1';
                if (plusEl) plusEl.style.opacity = '0';
                if (sym) sym.style.background = 'rgba(255, 152, 0, 1)';
            }
        });
    });
}

/**
 * Przycisk powrotu na górę (natywny scroll).
 */
function initBackToTop() {
    $('.mil-back-to-top a').on('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Niestandardowy kursor - uproszczony (bez GSAP).
 */
function initCursor() {
    const cursor = document.querySelector('.mil-ball');
    if (!cursor) return;

    if (!document.cursorMoveListener) {
        document.cursorMoveListener = function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.transform = 'translate(-50%, -50%)';
        };
        document.addEventListener('pointermove', document.cursorMoveListener);
    }

    $(document).off('.cursorEvents');
    $(document).on('mouseover.cursorEvents', '.mil-drag, .mil-more, .mil-choose', function () {
        cursor.style.width = '90px';
        cursor.style.height = '90px';
        cursor.style.opacity = '1';
    }).on('mouseleave.cursorEvents', '.mil-drag, .mil-more, .mil-choose', function () {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.opacity = '.1';
    });

    $(document).on('mouseover.cursorEvents', '.mil-accent-cursor', function () {
        cursor.style.background = 'rgba(255, 152, 0, 1)';
        cursor.classList.add('mil-accent');
    }).on('mouseleave.cursorEvents', '.mil-accent-cursor', function () {
        cursor.style.background = '#000';
        cursor.classList.remove('mil-accent');
    });

    const hideSelector = 'a:not(.mil-choose , .mil-more , .mil-drag , .mil-accent-cursor), input , textarea, .mil-accordion-menu';
    $(document).on('mouseover.cursorEvents', hideSelector, function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(0)';
    }).on('mouseleave.cursorEvents', hideSelector, function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/**
 * Pasek postępu przewijania (bez GSAP).
 */
function initProgressBar() {
    const progress = document.querySelector('.mil-progress');
    if (!progress) return;

    const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progress.style.height = percent + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/**
 * Inicjalizuje Fancybox.
 */
function initFancybox() {
    if (typeof Fancybox === 'undefined') return;
    Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: ["zoomIn", "zoomOut"],
                right: ["slideshow", "fullscreen", "close"],
            },
        },
        Hash: false
    });
}

/**
 * Inicjalizuje Swiper slidery.
 */
function initSwipers() {
    const reviewsSliderExists = document.querySelector('.mil-reviews-slider');
    const infiniteSliderExists = document.querySelector('.mil-infinite-show');
    const portfolioSliderExists = document.querySelector('.mil-portfolio-slider');

    if (reviewsSliderExists || infiniteSliderExists) {
        const menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>'];

        if (reviewsSliderExists) {
            new Swiper('.mil-reviews-slider', {
                modules: [Navigation, Pagination, Parallax, EffectFade],
                pagination: {
                    el: '.mil-revi-pagination',
                    clickable: true,
                    renderBullet: (index, className) => '<span class="' + className + '">' + (menu[index] || '') + '</span>',
                },
                speed: 800,
                effect: 'fade',
                parallax: true,
                navigation: {
                    nextEl: '.mil-revi-next',
                    prevEl: '.mil-revi-prev',
                },
            });
        }

        if (infiniteSliderExists) {
            new Swiper('.mil-infinite-show', {
                modules: [Navigation, Pagination, FreeMode, Thumbs, Mousewheel, Autoplay],
                slidesPerView: 2,
                spaceBetween: 30,
                speed: 5000,
                autoplay: { delay: 0 },
                loop: true,
                freeMode: true,
                breakpoints: { 992: { slidesPerView: 4 } },
            });
        }
    }

    if (portfolioSliderExists) {
        new Swiper('.mil-portfolio-slider', {
            modules: [Navigation, Pagination, Parallax, Mousewheel, Autoplay],
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 4800,
            parallax: true,
            autoplay: { delay: 0 },
            mousewheel: { enable: true },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
    }
}

function initMenuToggle() {
    $('.mil-menu-btn').off("click").on("click", function () {
        $('.mil-menu-btn').toggleClass('mil-active');
        $('.mil-menu').toggleClass('mil-active');
        $('.mil-menu-frame').toggleClass('mil-active');
        $('.mil-progress').hide();
    });
}

function initMainMenuDropdown() {
    $('.mil-has-children a').off('click').on('click', function () {
        const $link = $(this);
        const $ul = $link.next();
        if ($link.hasClass('mil-active')) {
            $link.removeClass('mil-active');
            $ul.removeClass('mil-active');
            return;
        }
        $('.mil-has-children ul').removeClass('mil-active');
        $('.mil-has-children a').removeClass('mil-active');
        $link.addClass('mil-active');
        $ul.addClass('mil-active');
    });
}

function initApp() {
    initAnchorScroll();
    initAppendElements();
    initProgressBar();
    initAccordion();
    initCursor();
    initBackToTop();
    initSwipers();
    initMenuToggle();
    initMainMenuDropdown();
    initFancybox();

    document.querySelector('.mil-menu-btn')?.classList.remove('mil-active');
    document.querySelector('.mil-menu')?.classList.remove('mil-active');
    document.querySelector('.mil-menu-frame')?.classList.remove('mil-active');
}

function runWhenReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

runWhenReady(() => {
    initPreloader();
    initApp();

    const form = document.getElementById('contactform');
    if (form) {
        form.action = '/send_email.php';
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const statusMessage = document.createElement('p');
            statusMessage.classList.add('mil-up');
            try {
                const response = await fetch(form.action, { method: form.method, body: formData });
                const result = await response.json();
                if (response.ok) {
                    statusMessage.style.color = 'green';
                    statusMessage.textContent = result.message || 'Wiadomość wysłana pomyślnie!';
                    form.reset();
                } else {
                    statusMessage.style.color = 'red';
                    statusMessage.textContent = result.message || 'Błąd wysyłki!';
                }
            } catch (error) {
                statusMessage.style.color = 'red';
                statusMessage.textContent = 'Błąd serwera. Spróbuj ponownie.';
            }
            form.after(statusMessage);
        });
    }
});
