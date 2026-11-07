import Lenis from "lenis";
import { DUR_L, gsap, pageLenis, runtime, ScrollTrigger } from "./config";

const lenisEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 2,
    easing: lenisEasing,
    infinite: false,
  });
  runtime.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Scroll containers inside modals get their own shorter-duration Lenis. */
export function initLocalLenis() {
  document.querySelectorAll<HTMLElement>("[data-lenis-scroll]").forEach((wrapper) => {
    const local = new Lenis({
      wrapper,
      duration: 0.6,
      smoothWheel: true,
      touchMultiplier: 2,
      easing: lenisEasing,
      infinite: false,
    });
    gsap.ticker.add((time) => local.raf(time * 1000));
  });
}

export function lockScroll() {
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty("--scrollbar-width", `${scrollbar}px`);
  document.body.style.paddingRight = "var(--scrollbar-width)";
  document.documentElement.style.overflow = "hidden";
  pageLenis().stop();
}

export function unlockScroll() {
  document.documentElement.style.removeProperty("--scrollbar-width");
  document.body.style.paddingRight = "";
  document.documentElement.style.overflow = "";
  pageLenis().start();
}

export function scrollToTop() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  runtime.lenis?.scrollTo(0, { immediate: true });
}

/** Same-page anchors: "#" is inert, "#id" scrolls through Lenis. */
export function initAnchors() {
  document.addEventListener("click", (event) => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    event.preventDefault();
    const id = anchor.getAttribute("href")!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) pageLenis().scrollTo(target, { duration: 3.2 });
  });
}

/** Header and scroll-bar colours follow whichever themed band sits beneath them. */
export function initThemeChange() {
  const themed = document.querySelectorAll<HTMLElement>("[data-theme]");
  if (!themed.length) return;

  const themes = {
    color: "theme_on-color",
    light: "theme_on-light",
    dark: "theme_on-dark",
  } as const;
  const allThemes = Object.values(themes);

  (Object.keys(themes) as (keyof typeof themes)[]).forEach((bg) => {
    const apply = (el: HTMLElement) => {
      el.classList.remove(...allThemes);
      el.classList.add(themes[bg]);
    };
    document.querySelectorAll<HTMLElement>(`[data-bg="${bg}"]`).forEach((band) => {
      if (getComputedStyle(band).display === "none") return;
      const bandRect = band.getBoundingClientRect();
      themed.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        if (centerX < bandRect.left || centerX > bandRect.right) return;
        const centerY = rect.top + rect.height / 2;
        ScrollTrigger.create({
          trigger: band,
          start: () => `top top+=${centerY}`,
          end: () => `bottom top+=${centerY}`,
          onEnter: () => apply(el),
          onEnterBack: () => apply(el),
        });
      });
    });
  });
}

/** 40ms after scrolling stops, settle onto a mostly-visible [data-snap] section. */
export function initSnapSections() {
  const sections = gsap.utils.toArray<HTMLElement>("[data-snap]");
  if (!sections.length) return;
  let timer: ReturnType<typeof setTimeout>;
  let touching = false;

  const settle = () => {
    if (touching) return;
    const viewport = window.innerHeight;
    let best: HTMLElement | undefined;
    let bestRatio = 0;
    for (const section of sections) {
      // Snapping a section taller than the screen would make its lower part unreachable.
      if (section.offsetHeight > viewport + 1) continue;
      const rect = section.getBoundingClientRect();
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      const ratio = visible / Math.min(section.offsetHeight, viewport);
      if (ratio > 0.5 && ratio > bestRatio) {
        bestRatio = ratio;
        best = section;
      }
    }
    if (best) {
      pageLenis().scrollTo(best, { duration: DUR_L, easing: gsap.parseEase("Ease") });
    }
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(settle, 40);
  };

  // A finger resting on the screen must not be fought by the snap.
  window.addEventListener("touchstart", () => (touching = true), { passive: true });
  window.addEventListener(
    "touchend",
    () => {
      touching = false;
      schedule();
    },
    { passive: true },
  );
  pageLenis().on("scroll", schedule);
}

/** Draggable progress rail on the left edge, labelled 00–100. */
export function initScrollBar() {
  const bar = document.querySelector<HTMLElement>("[data-s-bar]");
  if (!bar) return;
  const thumb = bar.querySelector<HTMLElement>("[data-s-bar-thumb]")!;
  const label = bar.querySelector<HTMLElement>("[data-s-bar-label]");

  ScrollTrigger.create({
    start: "top top",
    end: "bottom bottom",
    onUpdate: ({ progress }) => {
      bar.style.setProperty("--progress", `${progress * 100}%`);
      if (label) label.textContent = String(Math.round(progress * 100)).padStart(2, "0");
    },
  });

  let dragging = false;
  thumb.addEventListener("pointerenter", () => {
    document.body.style.cursor = "grab";
  });
  thumb.addEventListener("pointerleave", () => {
    if (!dragging) document.body.style.cursor = "";
  });
  thumb.addEventListener("pointerdown", (event) => {
    dragging = true;
    thumb.setPointerCapture(event.pointerId);
    document.body.style.cursor = "grabbing";
  });
  thumb.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    pageLenis().scrollTo(ratio * max, { duration: 3.2 });
  });
  thumb.addEventListener("pointerup", () => {
    dragging = false;
    document.body.style.cursor = "grab";
  });
}
