import { CustomEase } from "gsap/CustomEase";
import { DUR_L, DUR_S, gsap, isDesktop } from "./config";
import { lockScroll, scrollToTop, unlockScroll } from "./scroll";
import { animateCtn, animateLine, animateTextA, animateTextH, animateTextP } from "./text";

const VISITED_KEY = "hasVisited";

function hasVisited() {
  try {
    return Boolean(sessionStorage.getItem(VISITED_KEY));
  } catch {
    return false;
  }
}

/**
 * Plays the arch-mask reveal, then hands over to `onReady`. The first visit in a
 * session also plays the wordmark and progress line; later visits skip to the arch.
 */
export function runPreloader(onReady: () => void) {
  const preloader = document.querySelector<HTMLElement>("[data-preloader]");
  const master = document.querySelector("[data-master-preloader]");
  if (!preloader) {
    onReady();
    master?.remove();
    return;
  }
  const short = hasVisited();
  try {
    sessionStorage.setItem(VISITED_KEY, "true");
  } catch {}

  const content = preloader.querySelector(".preloader_ctn");
  const grain = preloader.querySelector(".preloader_bg_a");
  const decor = preloader.querySelector(".preloader_bg_decor");
  const heroImage = document.querySelector(".hero-w_bg_master_img");
  const archStart = isDesktop() ? "24vw" : "40vw";
  const archMid = isDesktop() ? "36vw" : "50vw";
  const heroScale = 0.75;

  setTimeout(scrollToTop, 100);
  lockScroll();
  if (heroImage) gsap.set(heroImage, { scale: heroScale, transformOrigin: "center top" });

  const timeline = gsap.timeline().set(preloader, { "--arch-w": archStart, "--arch-y": "104vh" });

  if (short) {
    timeline
      .set(content, { display: "none" })
      .fromTo(grain, { opacity: 0 }, { opacity: 0.05, duration: DUR_L, ease: "Out" })
      .fromTo(decor, { opacity: 0 }, { opacity: 1, duration: DUR_L, ease: "Out" }, "<");
  } else {
    CustomEase.create(
      "loaderEase",
      "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1",
    );
    timeline
      .add(() => {
        animateTextA(preloader.querySelectorAll('[data-part="a"]'), "reveal");
        animateTextH(preloader.querySelectorAll('[data-part="h"]'), "reveal");
        animateTextP(preloader.querySelectorAll('[data-part="p"]'), "reveal");
        animateCtn(preloader.querySelectorAll('[data-part="ctn"]'), "reveal", DUR_S);
        animateLine(preloader.querySelectorAll('[data-part="line"]'), "reveal");
      })
      .to({}, { duration: DUR_L })
      .fromTo(grain, { opacity: 0 }, { opacity: 0.05, duration: DUR_L, ease: "Out" })
      .fromTo(decor, { opacity: 0 }, { opacity: 1, duration: DUR_L, ease: "Out" }, "<")
      .fromTo(
        preloader.querySelectorAll(".preloader_progress_track"),
        { yPercent: -100 },
        { yPercent: 0, duration: 4, ease: "loaderEase" },
      );
  }

  timeline
    .fromTo(
      preloader,
      { "--arch-w": archStart, "--arch-y": "104vh" },
      { "--arch-w": archMid, "--arch-y": "15vh", duration: 1.25 * DUR_L, ease: "InOut" },
      short ? "<" : undefined,
    )
    .to(preloader, { "--arch-w": "125", "--arch-y": "-100vh", duration: 2 * DUR_L, ease: "diveIn" }, "<90%")
    .add(() => {
      if (heroImage) gsap.fromTo(heroImage, { scale: heroScale }, { scale: 1, duration: 1.25 * DUR_L, ease: "InOut" });
    }, "<")
    .add(onReady, "<25%")
    .add(() => {
      unlockScroll();
      gsap.set(preloader, { display: "none" });
    });

  master?.remove();
}
