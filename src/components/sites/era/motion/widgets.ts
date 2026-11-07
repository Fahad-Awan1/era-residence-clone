import { DUR_L, DUR_M, DUR_S, gsap, ScrollTrigger } from "./config";
import { animateCtn, animateSlide, animateTextH, animateTextP } from "./text";

const SLIDE_SECONDS = 6;

export function initAccordion() {
  let open: { card: Element; close: () => void } | null = null;
  document.querySelectorAll("[data-accordion-card]").forEach((card) => {
    const content = card.querySelector('[data-accordion-card="content"]');
    if (!content) return;
    const icon = card.querySelector("[data-ico-plus]");
    const copy = card.querySelectorAll('[data-accordion-card="p"]');
    const containers = card.querySelectorAll('[data-accordion-card="ctn"]');

    gsap.set(content, { height: 0, overflow: "hidden" });

    const refresh = () => ScrollTrigger.refresh();
    const close = () => {
      card.classList.remove("is-active");
      gsap.to(content, { height: 0, duration: DUR_L, ease: "Out", onComplete: refresh, overwrite: true });
      gsap.to(icon, { rotate: -90, duration: DUR_M, ease: "InOut", overwrite: true });
      animateTextP(copy, "hide", 0);
      animateCtn(containers, "hide", 0);
    };
    const expand = () => {
      card.classList.add("is-active");
      gsap.to(content, { height: "auto", duration: DUR_L, ease: "Out", onComplete: refresh });
      gsap.fromTo(icon, { rotate: 0 }, { rotate: -45, duration: DUR_M, ease: "InOut", overwrite: true });
      animateTextP(copy, "reveal");
      animateCtn(containers, "reveal");
    };

    card.addEventListener("click", () => {
      if (open && open.card !== card) open.close();
      if (open?.card === card) {
        close();
        open = null;
      } else {
        expand();
        open = { card, close };
      }
    });
  });
  ScrollTrigger.refresh();
}

function initOneSlider(root: HTMLElement) {
  const slides = root.querySelectorAll<HTMLElement>('[data-slider="slide"]');
  if (slides.length < 2) return;
  const current = root.querySelector('[data-slider="current"]');
  const nextNumber = root.querySelector('[data-slider="next-num"]');
  const progress = root.querySelector('[data-slider="progress"]');

  let index = 0;
  let animating = false;
  let timer: ReturnType<typeof setInterval>;

  const parts = (slide: Element) => ({
    h: slide.querySelectorAll('[data-slider="h"]'),
    p: slide.querySelectorAll('[data-slider="p"]'),
    ctn: slide.querySelectorAll('[data-slider="ctn"]'),
    img: slide.querySelectorAll('[data-slider="img"]'),
  });

  const updateLabels = () => {
    if (current) current.textContent = String(index + 1);
    if (nextNumber) nextNumber.textContent = String(index === slides.length - 1 ? 1 : index + 2);
  };

  const transition = (from: HTMLElement, to: HTMLElement) => {
    const a = parts(from);
    const b = parts(to);
    from.style.zIndex = "0";
    to.style.zIndex = "1";
    gsap.killTweensOf([from, to]);
    gsap
      .timeline({
        onComplete: () => {
          from.style.zIndex = "auto";
          to.style.zIndex = "1";
          animating = false;
        },
      })
      .set(to, { display: "block", position: "relative" })
      .set(from, { display: "block", position: "absolute" })
      .add(() => {
        animateTextH(b.h, "initial");
        animateTextP(b.p, "initial");
        animateCtn(b.ctn, "initial");
        animateSlide(b.img, "initial");
      })
      .add(() => ScrollTrigger.refresh())
      .add(() => {
        animateTextH(a.h, "hide", 0);
        animateTextP(a.p, "hide", 0);
        animateCtn(a.ctn, "hide", 0);
        animateSlide(a.img, "hide", 0);
        animateSlide(b.img, "reveal", 0);
      })
      .to({}, { duration: DUR_M })
      .add(() => {
        animateTextH(b.h, "reveal", 0);
        animateTextP(b.p, "reveal", 0);
        animateCtn(b.ctn, "reveal", DUR_S);
      })
      .to({}, { duration: DUR_S })
      .set(from, { display: "none" });
  };

  const go = (delta: 1 | -1) => {
    animating = true;
    const from = slides[index];
    index = (index + delta + slides.length) % slides.length;
    updateLabels();
    transition(from, slides[index]);
  };

  const runProgress = () => {
    if (progress) gsap.fromTo(progress, { width: "0%" }, { width: "100%", duration: SLIDE_SECONDS, ease: "none" });
  };
  const stop = () => {
    clearInterval(timer);
    if (progress) {
      gsap.killTweensOf(progress);
      gsap.set(progress, { width: "0%" });
    }
  };
  const start = () => {
    stop();
    runProgress();
    timer = setInterval(() => {
      go(1);
      runProgress();
    }, SLIDE_SECONDS * 1000);
  };

  gsap.set(slides, { display: "none", position: "absolute" });
  gsap.set(slides[0], { display: "block", position: "relative" });
  updateLabels();

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.2 }).observe(root);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  root.querySelector('[data-slider="prev"]')?.addEventListener("click", () => {
    if (animating) return;
    go(-1);
    start();
  });
  root.querySelector('[data-slider="next"]')?.addEventListener("click", () => {
    if (animating) return;
    start();
    go(1);
  });
}

export function initSliders() {
  gsap.utils.toArray<HTMLElement>('[data-slider=""]').forEach(initOneSlider);
}

/** Amenities: clicking a name swaps the slide with the same wipe as the sliders. */
export function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const triggers = [...root.querySelectorAll("[data-tab-trigger]")];
    const contents = root.querySelectorAll("[data-tab-content]");
    let active = 0;
    let animating = false;

    const contentFor = (trigger: Element) =>
      root.querySelector(`[data-tab-content="${trigger.getAttribute("data-tab-trigger")}"]`)!;
    const parts = (content: Element) => ({
      h: content.querySelectorAll('[data-tab="h"]'),
      p: content.querySelectorAll('[data-tab="p"]'),
      ctn: content.querySelectorAll('[data-tab="ctn"]'),
      slide: content.querySelectorAll('[data-tab="slide"]'),
    });

    triggers[0].classList.add("is-active");
    contents[0].classList.add("is-active");

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => {
        if (index === active || animating) return;
        const previous = triggers[active];
        const from = contentFor(previous);
        const to = contentFor(trigger);
        const a = parts(from);
        const b = parts(to);

        gsap.killTweensOf([from, to]);
        animating = true;
        gsap
          .timeline({ onComplete: () => void (animating = false) })
          .set(to, { display: "block", position: "relative", zIndex: 1 })
          .set(from, { display: "block", position: "absolute", zIndex: 0 })
          .add(() => {
            animateTextH(b.h, "initial");
            animateTextP(b.p, "initial");
            animateCtn(b.ctn, "initial");
            animateSlide(b.slide, "initial");
          })
          .add(() => ScrollTrigger.refresh())
          .add(() => {
            animateTextH(a.h, "hide", 0);
            animateTextP(a.p, "hide", 0);
            animateCtn(a.ctn, "hide", 0);
            animateSlide(a.slide, "hide", 0);
            animateSlide(b.slide, "reveal", 0);
          })
          .to({}, { duration: DUR_M })
          .add(() => {
            animateTextH(b.h, "reveal", 0);
            animateTextP(b.p, "reveal", 0);
            animateCtn(b.ctn, "reveal", DUR_S);
          })
          .to({}, { duration: DUR_S })
          .set(from, { display: "none" });

        previous.classList.remove("is-active");
        trigger.classList.add("is-active");
        active = index;
      });
    });
  });
}

/** The amenity rail's highlight bar follows the active tab. */
export function initTabsHighlight() {
  document.querySelectorAll<HTMLElement>("[data-tabs-hilight]").forEach((root) => {
    const tabs = root.querySelectorAll("[data-tab]");
    const bar = root.querySelector("[data-tab-hilight]");
    if (!tabs.length || !bar) return;
    const move = () => {
      setTimeout(() => {
        const tab = root.querySelector<HTMLElement>("[data-tab].is-active");
        if (tab) gsap.to(bar, { y: tab.offsetTop, height: tab.offsetHeight, duration: DUR_M, ease: "InOut" });
      }, 40);
    };
    move();
    tabs.forEach((tab) => tab.addEventListener("click", move));
  });
}

/** Hero "by day / by night": crossfades the render and slides the divider highlight. */
export function initTabsHero() {
  const root = document.querySelector("[data-tabs-hero]");
  if (!root) return;
  const triggers = [...root.querySelectorAll("[data-tab-trigger]")];
  const divider = root.querySelector<HTMLElement>(".hero-s_tabs_divider")!;
  let active = 0;
  let animating = false;

  const syncDivider = () => {
    const current = root.querySelector("[data-tab-trigger].is-active");
    if (!current) return;
    divider.classList.remove("is-day", "is-night");
    divider.classList.add(`is-${current.getAttribute("data-tab-trigger")}`);
  };
  const contentFor = (trigger: Element) =>
    root.querySelector(`[data-tab-content="${trigger.getAttribute("data-tab-trigger")}"]`)!;

  triggers[0].classList.add("is-active");
  syncDivider();

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      if (index === active || animating) return;
      const previous = triggers[active];
      const from = contentFor(previous);
      const to = contentFor(trigger);
      gsap.killTweensOf([from, to]);
      animating = true;
      gsap
        .timeline({ onComplete: () => void (animating = false) })
        .set(to, { display: "block", position: "relative", zIndex: 1 })
        .set(from, { display: "block", position: "absolute", zIndex: 0 })
        .add(() => ScrollTrigger.refresh())
        .fromTo(
          to.querySelector('[data-tab="img"]'),
          { opacity: 0 },
          { opacity: 1, duration: DUR_M, ease: "InOut", overwrite: true },
        )
        .set(from, { display: "none" });
      previous.classList.remove("is-active");
      trigger.classList.add("is-active");
      active = index;
      syncDivider();
    });
  });
}

/** Flowers only decode and play while their section is on screen. */
export function initSectionVideos() {
  gsap.utils.toArray<HTMLElement>("[data-video-playpause]").forEach((section) => {
    const videos = section.querySelectorAll<HTMLVideoElement>(".video");
    if (!videos.length) return;
    videos.forEach((video) => {
      video.muted = true;
      video.load();
      video.currentTime = 0;
    });
    const play = () => videos.forEach((video) => video.play().catch(() => {}));
    const pause = () => videos.forEach((video) => video.pause());
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    });
  });
}

/** Scales the "Architecture" heading to exactly fill its container. */
export function fitText() {
  document.querySelectorAll<HTMLElement>("[data-fit-text]").forEach((el) => {
    el.style.whiteSpace = "nowrap";
    el.style.fontSize = "";
    el.style.width = "max-content";
    const available = el.parentElement!.clientWidth;
    const measured = el.offsetWidth;
    const size = parseFloat(getComputedStyle(el).fontSize);
    el.style.width = "";
    el.style.fontSize = `${size * (available / measured)}px`;
  });
  window.addEventListener("resize", fitText, { once: true });
}

/** Safari has no alpha WebM, so it falls through to the MOV source. */
export function initPlatformQuirks() {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.querySelectorAll('source[src$=".webm"]').forEach((source) => source.remove());
  }
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
