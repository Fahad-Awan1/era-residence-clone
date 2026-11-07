import { DUR_L, DUR_M, DUR_S, gsap, isDesktop, ScrollTrigger } from "./config";
import { animateCtn, animateTextH, animateTextP } from "./text";

/** The horizontal location tween, consumed by reveals living inside the moving track. */
export const horizontalTweens = new WeakMap<Element, gsap.core.Tween>();

/** Page panning up the tall hero render, then zooming through it into the next section. */
function heroFlow() {
  const area = document.querySelector<HTMLElement>(".hero-scroll-area");
  if (!area) return;
  const content = area.querySelector(".hero-s")!;
  const bg = area.querySelector<HTMLElement>(".hero-w_bg")!;
  const image = bg.querySelector<HTMLImageElement>(".img")!;

  const build = () => {
    const height = bg.offsetHeight;
    gsap
      .timeline({
        scrollTrigger: { trigger: area, start: "top top", end: "bottom bottom", scrub: true },
      })
      .fromTo(content, { y: 0 }, { y: -(1.25 * height - window.innerHeight), ease: "Ease", duration: 0.6 })
      .fromTo(bg, { y: 0 }, { y: -(height - window.innerHeight), ease: "Ease", duration: 0.6 }, "<")
      .fromTo(
        bg,
        { scale: 1, translateZ: 10, transformOrigin: "50% 75%" },
        { scale: 2, translateZ: 10, ease: "In", duration: 0.6 },
        "-=0.2",
      );
  };
  if (image.complete) build();
  else image.addEventListener("load", build, { once: true });
}

/** "Three reasons to choose Era" spreads its words around the arch while scrolling. */
function benefitsIntroFlow() {
  const wrap = document.querySelector(".benefits-intro-w");
  if (!wrap) return;
  gsap
    .timeline({ scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } })
    .fromTo(
      wrap.querySelectorAll("[data-circle-text]"),
      { wordSpacing: "0rem" },
      { wordSpacing: "10rem", ease: "none" },
    );
}

/** Concept panel: scales and fades in, text toggles at the 30% line. */
function conceptFlow() {
  const wrap = document.querySelector(".loc-info-w");
  if (!wrap) return;
  const panel = wrap.querySelector(".loc-info-s")!;
  const copy = wrap.querySelectorAll('[data-part="p"]');
  const containers = wrap.querySelectorAll('[data-part="ctn"]');
  animateTextP(copy, "initial");
  animateCtn(containers, "initial");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 30%",
        end: "bottom bottom",
        scrub: 0.5,
        onEnter: () => {
          animateTextP(copy, "reveal", 0.1);
          animateCtn(containers, "reveal", 0.1);
        },
        onLeaveBack: () => {
          animateTextP(copy, "hide", 0);
          animateCtn(containers, "hide", 0);
        },
      },
    })
    .fromTo(panel, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, ease: "none" }, 0);
}

/** The location panels travel sideways while the section is pinned by CSS sticky. */
function locationTrackFlow() {
  const area = document.querySelector<HTMLElement>(".loc-scroll-area");
  if (!area) return;
  const track = area.querySelector<HTMLElement>(".loc-scroll-area_track")!;
  const distance = track.scrollWidth - area.offsetWidth;
  // A phone's panels fill the screen, so give them more scroll and let the first and last rest.
  const desktop = isDesktop();
  area.style.height = `${track.scrollWidth * (desktop ? 1 : 1.5)}px`;
  ScrollTrigger.refresh();

  horizontalTweens.set(
    area,
    gsap.to(track, {
      x: -distance,
      ease: "horScroll",
      scrollTrigger: {
        trigger: area,
        start: desktop ? "2.5% top" : "8% top",
        end: desktop ? "97.5% bottom" : "95% bottom",
        scrub: 0.25,
      },
    }),
  );

  const span = { trigger: area, start: "top top", end: "bottom bottom", scrub: 0.25 };
  gsap.fromTo(
    area.querySelectorAll(".loc-intro-s_title_line"),
    { xPercent: gsap.utils.wrap([-5, 25, -15]) },
    { xPercent: gsap.utils.wrap([5, -25, 25]), ease: "none", scrollTrigger: span },
  );
  gsap.fromTo(
    area.querySelector(".flower.loc-intro"),
    { xPercent: 0 },
    { xPercent: -25, ease: "none", scrollTrigger: span },
  );
  gsap.fromTo(
    area.querySelector(".flower.loc-path"),
    { yPercent: 0 },
    {
      yPercent: 25,
      ease: "none",
      scrollTrigger: { trigger: area, start: "bottom bottom", end: "bottom top", scrub: 0.25 },
    },
  );
}

/** The coast route draws left to right once. */
function coastPathFlow() {
  const path = document.querySelector(".img.loc-path");
  if (!path) return;
  const area = path.closest("[data-scroll-horizontal]");
  const containerAnimation = area ? horizontalTweens.get(area) : undefined;
  gsap.fromTo(
    path,
    { clipPath: "inset(0% 100% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2 * DUR_L,
      ease: "Out",
      delay: DUR_M,
      scrollTrigger: {
        trigger: path,
        containerAnimation,
        start: containerAnimation ? "left bottom" : "top bottom",
        once: true,
      },
    },
  );
}

function masterPlanFlow() {
  const wrap = document.querySelector(".loc-w");
  if (!wrap) return;
  gsap.from(wrap.querySelector(".loc-w_bg_img"), {
    scale: 1.15,
    transformOrigin: "center bottom",
    ease: "Ease",
    scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom bottom", scrub: 0.25 },
  });
}

function amenitiesFlow() {
  const area = document.querySelector(".amen-scroll-area");
  if (!area) return;
  gsap
    .timeline({ scrollTrigger: { trigger: area, start: "top top", end: "bottom bottom", scrub: true } })
    .fromTo(area.querySelector(".amen-cms"), { scale: 1 }, { scale: 2, ease: "In" })
    .fromTo(area.querySelector(".amen-w"), { opacity: 1 }, { opacity: 0, ease: "In" }, "<");
}

const POLY = {
  leftStart:
    "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)",
  leftAligned:
    "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
  leftOpen:
    "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
  rightStart:
    "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)",
  rightAligned:
    "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
  rightOpen:
    "polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)",
};

/** Two offset framed windows merge, then zoom out to reveal the full architecture image. */
function architectureFlow() {
  const area = document.querySelector(".arch-scroll-area");
  if (!area) return;
  const intro = area.querySelector(".arch-intro-s")!;
  const left = intro.querySelector(".arch-intro-s_bg_l");
  const right = intro.querySelector(".arch-intro-s_bg_r");
  const flowerLeft = intro.querySelector(".flower.arch-intro-l");
  const flowerRight = intro.querySelector(".flower.arch-intro-r");
  const scene = area.querySelector(".arch-w")!;
  const image = scene.querySelector(".img");
  const heading = scene.querySelector('[data-text="h"]')!;
  const copy = scene.querySelector('[data-text="p"]')!;

  gsap
    .timeline({ scrollTrigger: { trigger: intro, start: "top bottom", end: "200% top", scrub: true } })
    .fromTo(left, { clipPath: POLY.leftStart }, { clipPath: POLY.leftAligned, ease: "none", duration: 0.5 })
    .fromTo(right, { clipPath: POLY.rightStart }, { clipPath: POLY.rightAligned, ease: "none", duration: 0.5 }, "<")
    .to(left, { clipPath: POLY.leftOpen, ease: "none", duration: 0.1 })
    .to(right, { clipPath: POLY.rightOpen, ease: "none", duration: 0.1 }, "<")
    .fromTo(intro, { scale: 1 }, { scale: 1.84, ease: "InOut", duration: 0.4 })
    .to(flowerLeft, { scale: 1.84, xPercent: -50, ease: "InOut", duration: 0.4 }, "<")
    .to(flowerRight, { scale: 1.84, xPercent: 50, ease: "InOut", duration: 0.4 }, "<")
    .fromTo(scene, { scale: 0.75, transformOrigin: "center top" }, { scale: 1, ease: "InOut", duration: 0.4 }, "<");

  animateTextH(heading, "initial");
  animateTextP(copy, "initial");
  ScrollTrigger.create({
    trigger: area,
    start: "30% top",
    onEnter: () => {
      animateTextH(heading, "reveal", 0);
      animateTextP(copy, "reveal", DUR_S);
    },
    onLeaveBack: () => {
      animateTextH(heading, "hide", 0);
      animateTextP(copy, "hide", 0);
    },
  });
  gsap.to(image, {
    yPercent: 25,
    ease: "none",
    scrollTrigger: { trigger: area, start: "55% top", end: "bottom top", scrub: true },
  });
}

/** The CTA image shrinks into a clipped window as the footer rises behind it. */
function footerFlow() {
  const footer = document.querySelector(".footer-w");
  if (!footer) return;
  const clip = document.querySelector("[data-footer-clip]");
  const panel = footer.querySelector(".footer-s");
  const headings = footer.querySelectorAll('[data-text="h"]');
  const copy = footer.querySelectorAll('[data-text="p"]');
  const containers = footer.querySelectorAll('[data-text="ctn"]');
  animateTextH(headings, "initial");
  animateTextP(copy, "initial");
  animateCtn(containers, "initial");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 30%",
        end: "bottom bottom",
        scrub: 0.5,
        onEnter: () => {
          animateTextH(headings, "reveal", 0.1);
          animateTextP(copy, "reveal", 0.1);
          animateCtn(containers, "reveal", 0.1);
        },
        onLeaveBack: () => {
          animateTextH(headings, "hide", 0);
          animateTextP(copy, "hide", 0);
          animateCtn(containers, "hide", 0);
        },
      },
    })
    .fromTo(
      clip,
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: isDesktop() ? "inset(8% 22% 8% 22%)" : "inset(4% 32% 4% 32%)", ease: "none" },
      0,
    )
    .fromTo(panel, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, ease: "none" }, 0);

  const hint = document.querySelector(".s-down");
  if (hint) {
    gsap.to(hint, {
      opacity: 0,
      ease: "InOut",
      scrollTrigger: { trigger: footer, start: "top bottom", end: "center bottom", scrub: true },
    });
  }
}

export function initTransitionFlow() {
  heroFlow();
  benefitsIntroFlow();
  conceptFlow();
  locationTrackFlow();
  coastPathFlow();
  masterPlanFlow();
  amenitiesFlow();
  architectureFlow();
  footerFlow();
}
