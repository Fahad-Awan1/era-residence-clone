import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

// Named eases shared by every timeline; values match the CSS --ease-* tokens.
CustomEase.create("InOut", "0.75,0,0.25,1");
CustomEase.create("Out", "0.25,1,0.5,1");
CustomEase.create("In", "0.5,0,0.75,0");
CustomEase.create("Ease", "0.25,0.1,0.25,1");
CustomEase.create("diveIn", "0.6,0,0,1");
CustomEase.create("horScroll", "0.25,0,0.75,1");

export const BREAKPOINT = 992;
export const DUR_S = 0.4;
export const DUR_M = 0.8;
export const DUR_L = 1.2;
export const STAGGER = 0.1;
export const DELAY_REVEAL = 0.3;

export const isDesktop = () => window.innerWidth >= BREAKPOINT;

export const runtime: { lenis: Lenis | null } = { lenis: null };

/** The page-wide Lenis instance; it always exists once `initLenis` has run. */
export function pageLenis(): Lenis {
  if (!runtime.lenis) throw new Error("Lenis is not initialised");
  return runtime.lenis;
}

export { gsap, ScrollTrigger, SplitText };
