import { DUR_L, DUR_M, gsap, isDesktop, pageLenis, SplitText, STAGGER } from "./config";

/** Stagger by horizontal position, so wrapped lines ripple left to right together. */
const staggerByX = (total: number) => (index: number, _target: unknown, list: Element[]) => {
  const lefts = list.map((el) => el.getBoundingClientRect().left);
  const min = Math.min(...lefts);
  const range = Math.max(...lefts) - min || 1;
  return ((lefts[index] - min) / range) * total;
};

export function initMagneticEffect() {
  const inners = (button: Element) => button.querySelectorAll("[data-magnetic-inner]");

  const release = (el: Element, instant: boolean) => {
    gsap.killTweensOf(el);
    if (instant) gsap.set(el, { x: 0, y: 0, force3D: true, clearProps: "all" });
    else gsap.to(el, { x: 0, y: 0, force3D: true, clearProps: "all", ease: "elastic.out(1, 0.3)", duration: 1.6 });
  };

  document.querySelectorAll<HTMLElement>("[data-magnetic-btn]").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      release(button, true);
      inners(button).forEach((el) => release(el, true));
    });
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const strength = 25 / 16;
      const x = `${((event.clientX - rect.left) / button.offsetWidth - 0.5) * strength}em`;
      const y = `${((event.clientY - rect.top) / button.offsetHeight - 0.5) * strength}em`;
      gsap.to(button, { x, y, force3D: true, ease: "power4.out", duration: 1.6 });
      inners(button).forEach((el) => gsap.to(el, { x, y, force3D: true, ease: "power4.out", duration: 2 }));
    });
    button.addEventListener("mouseleave", () => {
      release(button, false);
      inners(button).forEach((el) => release(el, false));
    });
  });
}

/** Letters slide up behind a mask and are replaced by their duplicate from below. */
export function initNavItemHover() {
  const split = (el: Element) =>
    new SplitText(el, {
      type: "words,chars",
      tag: "span",
      smartWrap: true,
      wordsClass: "split-word",
      charsClass: "split-char",
      mask: "words",
    });

  document.querySelectorAll("[hover-nav-item]").forEach((item) => {
    const texts = item.querySelectorAll("[hover='text']");
    if (texts.length < 2) return;
    const front = split(texts[0]);
    const back = split(texts[1]);
    const motion = {
      duration: DUR_M,
      ease: "Ease",
      stagger: staggerByX(2 * STAGGER),
      overwrite: true,
      force3D: true,
    };
    gsap.set(back.chars, { yPercent: 100, opacity: 0 });
    const trigger = item.closest("[hover-nav-item-trigger]") ?? item;
    trigger.addEventListener("mouseenter", () => {
      gsap.fromTo(front.chars, { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -100, ...motion });
      gsap.fromTo(back.chars, { yPercent: 100, opacity: 0 }, { opacity: 1, yPercent: 0, ...motion });
    });
    trigger.addEventListener("mouseleave", () => {
      gsap.to(front.chars, { opacity: 1, yPercent: 0, ...motion });
      gsap.to(back.chars, { opacity: 0, yPercent: 100, ...motion });
    });
  });
}

/** Heading links: characters turn over while the underline retracts and redraws. */
export function initLinkHover() {
  document.querySelectorAll("[hover-link]").forEach((link) => {
    const texts = link.querySelectorAll("[hover='text']");
    if (texts.length < 2) return;
    const front = new SplitText(texts[0], {
      type: "lines,words,chars",
      tag: "span",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const back = new SplitText(texts[1], {
      type: "words,chars",
      tag: "span",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const underlines = front.lines.map((line) => {
      const underline = document.createElement("span");
      underline.classList.add("link_line");
      line.appendChild(underline);
      return underline;
    });
    const shown = { opacity: 1, x: "0em", yPercent: 0, rotateY: 0 };
    const hiddenBack = { opacity: 0, x: "-0.4em", yPercent: 25, rotateY: 90 };
    const motion = { duration: DUR_M, ease: "Out", stagger: STAGGER / 4, overwrite: true, force3D: true };
    const lineMotion = { duration: DUR_M, ease: "Out", stagger: STAGGER, overwrite: true };

    gsap.set(underlines, { scaleX: 1, transformOrigin: "right center" });
    gsap.set(back.chars, hiddenBack);

    link.addEventListener("mouseenter", () => {
      gsap.fromTo(front.chars, shown, { opacity: 0, x: "0.4em", yPercent: -25, rotateY: -90, ...motion });
      gsap.fromTo(back.chars, hiddenBack, { ...shown, ...motion, delay: 0.2 });
      gsap.fromTo(underlines, { scaleX: 1, transformOrigin: "right center" }, { scaleX: 0, ...lineMotion });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(front.chars, { ...shown, ...motion, delay: 0.2 });
      gsap.to(back.chars, { ...hiddenBack, ...motion });
      gsap.to(underlines, { scaleX: 1, transformOrigin: "left center", ...lineMotion });
    });
  });
}

/** Two short arcs on the circular button grow until they close the ring. */
export function initBtnCircleHover() {
  document.querySelectorAll("[hover-btn-circle]").forEach((button) => {
    const arcs = button.querySelectorAll("[data-arc]");
    if (!arcs.length) return;
    const circumference = 2 * Math.PI * 103.5;
    gsap.set(arcs, { strokeDasharray: `${0.0417 * circumference} ${circumference}` });
    const timeline = gsap
      .timeline({ paused: true })
      .to(arcs, { strokeDasharray: `${circumference / 2} ${circumference}`, duration: DUR_M, ease: "InOut" });
    button.addEventListener("mouseenter", () => timeline.play());
    button.addEventListener("mouseleave", () => timeline.reverse());
  });
}

export function initPins() {
  document.querySelectorAll<HTMLElement>("[data-pin]").forEach((pin) => {
    const pulses = pin.querySelectorAll("[data-pin-pulse]");
    const size = pin.offsetWidth;
    gsap.fromTo(
      pulses,
      { opacity: 1, width: size, height: size },
      { opacity: 0, width: 1.6 * size, height: 1.6 * size, duration: DUR_L, ease: "In", stagger: 0.2, repeat: -1 },
    );
  });
}

/** Header ring: constant 30deg/s spin that speeds up and reverses with scroll velocity. */
export function initLogoSpin() {
  const logo = document.querySelector(".header-logo");
  if (!logo) return;
  const ring = [...logo.querySelectorAll(".header-logo_bg")].find(
    (el) => getComputedStyle(el).display !== "none",
  );
  if (!ring) return;

  const spin = { speed: 30 };
  let direction = 1;
  let rotation = 0;
  let userScrolled = false;
  let settle: ReturnType<typeof setTimeout>;

  window.addEventListener("wheel", () => (userScrolled = true), { once: true });
  window.addEventListener("touchmove", () => (userScrolled = true), { once: true });

  gsap.ticker.add((_time, delta) => {
    rotation += spin.speed * (Math.min(delta, 100) / 1000);
    gsap.set(ring, { rotation, transformOrigin: "center center" });
  });

  pageLenis().on("scroll", ({ velocity }) => {
    if (!userScrolled) return;
    if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
    gsap.to(spin, { speed: direction * (30 + 10 * Math.abs(velocity)), duration: 0.3, ease: "Out", overwrite: true });
    clearTimeout(settle);
    settle = setTimeout(() => {
      gsap.to(spin, { speed: 30 * direction, duration: DUR_L, ease: "Out" });
    }, 100);
  });
}

/** Footer credit: Lottie frames are scrubbed to the midpoint on hover and to the end on leave. */
export async function initCreditsLogo() {
  const credits = document.querySelector(".credits");
  const container = credits?.querySelector<HTMLElement>(".credits_logo");
  if (!credits || !container) return;
  const { default: lottie } = await import("lottie-web");
  const animation = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: container.dataset.json,
  });
  const lastFrame = 98;
  animation.addEventListener("DOMLoaded", () => animation.goToAndStop(0, true));
  const state = { progress: 0 };
  const timeline = gsap.timeline({ paused: true }).to(state, {
    progress: 1,
    duration: 1,
    ease: "none",
    onUpdate: () => animation.goToAndStop(Math.round(state.progress * lastFrame), true),
  });
  credits.addEventListener("mouseenter", () => gsap.to(timeline, { progress: 0.5, duration: 1 }));
  credits.addEventListener("mouseleave", () => gsap.to(timeline, { progress: 1, duration: 1 }));
}

/**
 * Pin tooltips trail the cursor and flip left near the viewport edge. Below the
 * breakpoint the card is centred because it nearly fills the width; touch screens
 * have no hover, so a tap opens it and a tap anywhere else closes it.
 */
export function initFloatingTips() {
  const tips = new Map(
    [...document.querySelectorAll<HTMLElement>("[floating-tip]")].map((tip) => [tip.getAttribute("floating-tip"), tip]),
  );
  const active = new Set<HTMLElement>();
  const isTouch = () => window.matchMedia("(hover: none)").matches;

  const target = (tip: HTMLElement, x: number, y: number) => {
    if (isDesktop()) {
      const rect = tip.getBoundingClientRect();
      tip.classList.toggle("is-left", x + rect.width > window.innerWidth);
      tip.classList.toggle("is-top", y + rect.height > window.innerHeight);
      return { x, y };
    }
    const card = tip.querySelector<HTMLElement>(".floating-tip-card")!;
    const margin = card.offsetHeight / 2 + 16;
    return {
      x: (window.innerWidth - card.offsetWidth) / 2,
      y: Math.max(margin, Math.min(window.innerHeight - margin, y)),
    };
  };
  const open = (tip: HTMLElement, x: number, y: number) => {
    gsap.set(tip, target(tip, x, y));
    tip.classList.add("is-active");
    active.add(tip);
  };
  const close = (tip: HTMLElement) => {
    tip.classList.remove("is-active", "is-left", "is-top");
    active.delete(tip);
  };

  document.addEventListener("mousemove", (event) => {
    if (isTouch()) return;
    active.forEach((tip) => {
      gsap.to(tip, { ...target(tip, event.clientX, event.clientY), duration: 2 * DUR_L, ease: "power3" });
    });
  });
  document.addEventListener("click", (event) => {
    if (!isTouch()) return;
    const trigger = (event.target as Element).closest("[floating-tip-trigger]");
    const tapped = trigger ? tips.get(trigger.getAttribute("floating-tip-trigger")) : undefined;
    const wasOpen = tapped ? active.has(tapped) : false;
    [...active].forEach(close);
    if (tapped && !wasOpen) open(tapped, event.clientX, event.clientY);
  });
  document.querySelectorAll<HTMLElement>("[floating-tip-trigger]").forEach((trigger) => {
    const tip = tips.get(trigger.getAttribute("floating-tip-trigger"));
    if (!tip) return;
    trigger.addEventListener("mouseenter", (event) => {
      if (!isTouch()) open(tip, event.clientX, event.clientY);
    });
    trigger.addEventListener("mouseleave", () => {
      if (!isTouch()) close(tip);
    });
  });
}
