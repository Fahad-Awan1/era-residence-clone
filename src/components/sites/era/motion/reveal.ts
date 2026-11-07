import { gsap, ScrollTrigger } from "./config";
import { horizontalTweens } from "./flow";
import {
  animateCtn,
  animateLine,
  animateSlide,
  animateTextA,
  animateTextH,
  animateTextP,
  type Animator,
} from "./text";

/** Only a slider's or tab set's first slide reveals on scroll; the rest animate on selection. */
export function initScrollRevealFirst() {
  const groups = new Map<Element, Element[]>();
  document.querySelectorAll("[data-reveal-first]").forEach((item) => {
    const parent = item.parentElement!;
    groups.set(parent, [...(groups.get(parent) ?? []), item]);
  });
  groups.forEach((items) => {
    items.slice(1).forEach((item) => {
      item
        .querySelectorAll("[data-scroll-reveal]")
        .forEach((el) => el.removeAttribute("data-scroll-reveal"));
    });
  });
}

export function initScrollReveals() {
  const kinds: [string, Animator][] = [
    ["a", animateTextA],
    ["h", animateTextH],
    ["p", animateTextP],
    ["ctn", animateCtn],
    ["line", animateLine],
    ["slide", animateSlide],
  ];
  kinds.forEach(([kind, animate]) => {
    document.querySelectorAll<HTMLElement>(`[data-scroll-reveal="${kind}"]`).forEach((el) => {
      gsap.set(el, { visibility: "visible" });
      const track = el.closest("[data-scroll-horizontal]");
      const containerAnimation = track ? horizontalTweens.get(track) : undefined;
      ScrollTrigger.create({
        trigger: el,
        containerAnimation,
        start: containerAnimation ? "left bottom" : "top bottom",
        once: true,
        onEnter: () => animate(el, "reveal"),
      });
      animate(el, "initial");
    });
  });
}

type ParallaxKind = {
  selector: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  scrollTrigger: (trigger: Element) => ScrollTrigger.Vars;
  /** The element is its own trigger; otherwise the closest [data-parallax="w"] is. */
  self?: boolean;
};

const PARALLAX: ParallaxKind[] = [
  {
    selector: '[data-parallax="img"]',
    from: { yPercent: -15, translateZ: 10 },
    to: { yPercent: 15, translateZ: 10 },
    scrollTrigger: (trigger) => ({ trigger, start: "top bottom", scrub: 0.5 }),
  },
  {
    selector: '[data-parallax="img-out"]',
    from: { yPercent: 0, translateZ: 10 },
    to: { yPercent: 20, translateZ: 10 },
    scrollTrigger: (trigger) => ({ trigger, start: "bottom bottom", end: "bottom top", scrub: 0.5 }),
  },
  {
    selector: '[data-parallax="img-in"]',
    from: { yPercent: -20, translateZ: 10 },
    to: { yPercent: 0, translateZ: 10 },
    scrollTrigger: (trigger) => ({ trigger, start: "top bottom", end: "bottom bottom", scrub: true }),
  },
  {
    selector: '[data-parallax="ctn-down"]',
    self: true,
    from: { yPercent: -10 },
    to: { yPercent: 10 },
    scrollTrigger: (trigger) => ({ trigger, start: "top 125%", end: "bottom -25%", scrub: 0.5 }),
  },
  {
    selector: '[data-parallax="ctn-up"]',
    self: true,
    from: { yPercent: 10 },
    to: { yPercent: -10 },
    scrollTrigger: (trigger) => ({ trigger, start: "top 125%", end: "bottom -25%", scrub: 0.5 }),
  },
];

export function initAllParallax() {
  PARALLAX.forEach(({ selector, from, to, scrollTrigger, self }) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      const owner = self ? el : el.closest<HTMLElement>('[data-parallax="w"]');
      if (!owner || owner.dataset.desk === "off") return;
      gsap.fromTo(el, from, { ...to, ease: "none", scrollTrigger: scrollTrigger(owner) });
    });
  });
}
