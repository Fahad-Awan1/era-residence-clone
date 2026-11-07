import { ScrollTrigger } from "./config";
import { initTransitionFlow } from "./flow";
import {
  initBtnCircleHover,
  initCreditsLogo,
  initFloatingTips,
  initLinkHover,
  initLogoSpin,
  initMagneticEffect,
  initNavItemHover,
  initPins,
} from "./hover";
import { initBookingForm, initBookingModal, initCookies, initMobileMenu } from "./overlays";
import { runPreloader } from "./preloader";
import { initAllParallax, initScrollRevealFirst, initScrollReveals } from "./reveal";
import { initAnchors, initLenis, initLocalLenis, initScrollBar, initSnapSections, initThemeChange } from "./scroll";
import {
  fitText,
  initAccordion,
  initPlatformQuirks,
  initSectionVideos,
  initSliders,
  initTabs,
  initTabsHero,
  initTabsHighlight,
} from "./widgets";

/** Runs part-way through the preloader's dive, in the order the timelines depend on. */
function initPage() {
  initTransitionFlow();
  initLocalLenis();
  initThemeChange();
  initSnapSections();
  initBookingForm();
  initSectionVideos();
  initPlatformQuirks();
  fitText();
  initScrollRevealFirst();
  initScrollReveals();
  initMagneticEffect();
  initNavItemHover();
  initLinkHover();
  initBtnCircleHover();
  initPins();
  initLogoSpin();
  initScrollBar();
  void initCreditsLogo();
  initAccordion();
  initSliders();
  initTabs();
  initTabsHighlight();
  initTabsHero();
  initBookingModal();
  initMobileMenu();
  initFloatingTips();
}

export function initEra() {
  document.documentElement.style.setProperty("--_100svh", `${window.innerHeight}px`);
  history.scrollRestoration = "manual";

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 40);
  });

  initLenis();
  initAnchors();
  initCookies();
  initAllParallax();
  runPreloader(initPage);
}
