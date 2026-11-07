import { DELAY_REVEAL, DUR_L, DUR_S, gsap, isDesktop, SplitText, STAGGER } from "./config";

export type RevealState = "reveal" | "hide" | "initial";
type Targets = Element | Element[] | NodeListOf<Element>;
export type Animator = (targets: Targets, state: RevealState, delay?: number) => void;

const splits = new WeakMap<Element, SplitText>();

function splitOnce(el: Element, vars: SplitText.Vars, afterSplit?: () => void) {
  let split = splits.get(el);
  if (!split) {
    split = new SplitText(el, vars);
    splits.set(el, split);
    afterSplit?.();
  }
  return split;
}

const toList = (targets: Targets) => gsap.utils.toArray<HTMLElement>(targets);

/** Script accent headings: characters tumble in on X. */
export const animateTextA: Animator = (targets, state, delay) => {
  toList(targets).forEach((el, index) => {
    if (!el.textContent?.trim()) return;
    const { chars } = splitOnce(el, {
      type: "chars",
      tag: "span",
      charsClass: "split-char",
      smartWrap: true,
    });
    const offset = index * STAGGER;
    if (state === "reveal") {
      gsap.fromTo(
        chars,
        { opacity: 0, rotateX: 90, x: "10rem", transformOrigin: "center bottom" },
        {
          opacity: 1,
          rotateX: 0,
          x: "0rem",
          duration: DUR_L,
          delay: (delay ?? DELAY_REVEAL) + offset,
          stagger: STAGGER,
          ease: "Out",
          overwrite: true,
        },
      );
    } else if (state === "hide") {
      gsap.to(chars, {
        opacity: 0,
        rotateX: -90,
        x: "-10rem",
        transformOrigin: "center top",
        duration: DUR_S,
        delay: delay ?? 0,
        stagger: STAGGER / 2,
        ease: "In",
        overwrite: true,
      });
    } else {
      gsap.set(chars, { opacity: 0, rotateX: -90, x: "-10rem", transformOrigin: "center top" });
    }
  });
};

/** Display headings: characters turn in on Y. */
export const animateTextH: Animator = (targets, state, delay) => {
  toList(targets).forEach((el, index) => {
    if (!el.textContent?.trim()) return;
    const { chars } = splitOnce(el, {
      type: "words,chars",
      tag: "span",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const offset = index * STAGGER;
    if (state === "reveal") {
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 50, rotateY: 90 },
        {
          opacity: 1,
          yPercent: 0,
          rotateY: 0,
          duration: DUR_L,
          delay: (delay ?? DELAY_REVEAL) + offset,
          stagger: STAGGER / 2,
          ease: "Out",
          overwrite: true,
        },
      );
    } else if (state === "hide") {
      gsap.to(chars, {
        opacity: 0,
        yPercent: -50,
        rotateY: -90,
        duration: DUR_S,
        delay: delay ?? 0,
        stagger: STAGGER / 4,
        ease: "In",
        overwrite: true,
      });
    } else {
      gsap.set(chars, { opacity: 0, yPercent: 50, rotateY: 90 });
    }
  });
};

/** Body copy: masked lines rise. */
export const animateTextP: Animator = (targets, state, delay) => {
  toList(targets).forEach((el, index) => {
    if (!el.textContent?.trim()) return;
    const { lines } = splitOnce(
      el,
      {
        type: "lines,words",
        tag: "span",
        linesClass: "split-line",
        wordsClass: "split-word",
        mask: "lines",
      },
      () => {
        el.querySelectorAll("br").forEach((br) => {
          if (br.nextSibling?.nodeName !== "BR") br.after(document.createElement("br"));
        });
      },
    );
    const offset = index * STAGGER;
    if (state === "reveal") {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: DUR_L,
          delay: (delay ?? DELAY_REVEAL) + offset,
          stagger: STAGGER,
          ease: "Out",
          overwrite: true,
        },
      );
    } else if (state === "hide") {
      gsap.to(lines, {
        yPercent: -110,
        duration: DUR_S,
        delay: delay ?? 0,
        stagger: STAGGER / 2,
        ease: "In",
        overwrite: true,
      });
    } else {
      gsap.set(lines, { yPercent: 110 });
    }
  });
};

/** Generic containers: fade and rise. */
export const animateCtn: Animator = (targets, state, delay) => {
  const list = toList(targets);
  if (!list.length) return;
  const rise = isDesktop() ? "3.333rem" : "11.54rem";
  if (state === "reveal") {
    gsap.fromTo(
      list,
      { opacity: 0, y: rise },
      {
        opacity: 1,
        y: "0rem",
        duration: DUR_L,
        delay: delay ?? DELAY_REVEAL,
        stagger: STAGGER,
        ease: "Out",
        overwrite: true,
      },
    );
  } else if (state === "hide") {
    gsap.to(list, {
      opacity: 0,
      y: "0rem",
      duration: DUR_S,
      delay: delay ?? 0,
      stagger: STAGGER / 2,
      ease: "In",
      overwrite: true,
    });
  } else {
    gsap.set(list, { opacity: 0, y: rise });
  }
};

/** Vertical rules: draw downward. */
export const animateLine: Animator = (targets, state, delay) => {
  const list = toList(targets);
  if (!list.length) return;
  if (state === "reveal") {
    gsap.fromTo(
      list,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: DUR_L,
        delay: delay ?? DELAY_REVEAL,
        stagger: STAGGER,
        ease: "Out",
        overwrite: true,
      },
    );
  } else if (state === "hide") {
    gsap.to(list, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: DUR_S,
      delay: delay ?? 0,
      stagger: STAGGER / 2,
      ease: "In",
      overwrite: true,
    });
  } else {
    gsap.set(list, { clipPath: "inset(0% 0% 100% 0%)" });
  }
};

/** Images: a slanted wipe with the inner image counter-scaling. */
export const animateSlide: Animator = (targets, state, delay) => {
  const list = toList(targets);
  if (!list.length) return;
  const inner = list.map((el) => el.firstElementChild);
  if (state === "reveal") {
    const timing = { duration: DUR_L, delay: delay ?? DELAY_REVEAL, ease: "InOut", overwrite: true };
    gsap.fromTo(
      list,
      { clipPath: "polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ...timing },
    );
    gsap.fromTo(inner, { scale: 1.5, xPercent: 25 }, { scale: 1, xPercent: 0, ...timing });
  } else if (state === "hide") {
    const timing = { duration: DUR_L, delay: delay ?? 0, ease: "InOut", overwrite: true };
    gsap.fromTo(
      list,
      { clipPath: "polygon(0% 0%, 100% 0%, 125% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", ...timing },
    );
    gsap.to(inner, { scale: 1.5, xPercent: -25, ...timing });
  } else {
    gsap.set(list, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(inner, { scale: 1.5, xPercent: 25 });
  }
};
