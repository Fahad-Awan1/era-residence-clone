import { DELAY_REVEAL, DUR_L, DUR_M, gsap } from "./config";
import { lockScroll, unlockScroll } from "./scroll";
import { animateCtn, animateTextA, animateTextH, animateTextP } from "./text";

export function initCookies() {
  const banner = document.querySelector<HTMLElement>("[data-cookies='']");
  if (!banner) return;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("cookies");
  } catch {}
  if (stored) {
    banner.remove();
    return;
  }
  const choose = (value: string) => {
    try {
      localStorage.setItem("cookies", value);
    } catch {}
    gsap.to(banner, { yPercent: 100, duration: DUR_M, ease: "In", onComplete: () => banner.remove() });
  };
  gsap.fromTo(banner, { yPercent: 100 }, { yPercent: 0, duration: DUR_M, delay: DELAY_REVEAL, ease: "Out" });
  document.querySelector('[data-cookies="accept"]')!.addEventListener("click", () => choose("accepted"));
  document.querySelector('[data-cookies="decline"]')!.addEventListener("click", () => choose("declined"));
}

/** "Book a call": the card flips in from above and falls away on close. */
export function initBookingModal() {
  const modal = document.querySelector<HTMLElement>('[data-modal-cta="book-a-call"]');
  if (!modal) return;
  const card = modal.querySelector("[data-modal-container]");
  const overlay = modal.querySelector("[data-modal-over]");
  let isOpen = false;

  gsap.set(modal, { display: "none" });
  gsap.set(card, { transformPerspective: 1000 });

  const open = () => {
    if (isOpen) return;
    isOpen = true;
    gsap.set([modal, overlay], { display: "block" });
    gsap.fromTo(
      card,
      { scale: 0, rotateX: -90, yPercent: -100, rotate: -25 },
      { scale: 1, rotateX: 0, yPercent: 0, rotate: 0, duration: DUR_L, ease: "Out", overwrite: true },
    );
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: DUR_L, ease: "Out", overwrite: true });
    lockScroll();
  };
  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    gsap.to(card, {
      scale: 1,
      rotateX: 90,
      yPercent: 200,
      rotate: 25,
      duration: DUR_M,
      ease: "In",
      overwrite: true,
      onComplete: () => {
        gsap.set([modal, overlay], { display: "none" });
      },
    });
    gsap.to(overlay, { opacity: 0, duration: DUR_M, ease: "In", overwrite: true });
    unlockScroll();
  };

  document.querySelectorAll('[data-modal-cta-btn="book-a-call"]').forEach((button) => {
    button.addEventListener("click", open);
  });
  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", close);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

export function initMobileMenu() {
  const button = document.querySelector('[data-modal-menu-btn="mob"]');
  const modal = document.querySelector<HTMLElement>('[data-modal-menu="mob"]');
  if (!button || !modal) return;
  const container = modal.querySelector("[data-modal-container]");
  const overlay = modal.querySelector("[data-modal-over]");
  const accent = modal.querySelectorAll('[data-part="a"]');
  const heading = modal.querySelectorAll('[data-part="h"]');
  const copy = modal.querySelectorAll('[data-part="p"]');
  const links = modal.querySelectorAll('[data-part="ctn"]');
  const labels = button.querySelectorAll(".btn-menu_label");
  const iconA = button.querySelector('[data-ico-menu="is-1"]');
  const iconB = button.querySelector('[data-ico-menu="is-2"]');
  const themed = document.querySelectorAll("[data-theme]");
  let isOpen = false;

  gsap.set(modal, { display: "none" });
  gsap.set([iconA, iconB], { rotate: 180 });

  const open = () => {
    isOpen = true;
    gsap.set([modal, overlay], { display: "block" });
    themed.forEach((el) => {
      if (!el.classList.contains("theme_on-dark")) {
        el.classList.add("theme_on-dark");
        el.setAttribute("data-modal-themed", "");
      }
    });
    labels.forEach((label) => label.classList.toggle("is-active"));
    gsap.fromTo(container, { yPercent: 0 }, { yPercent: 0, duration: DUR_L, ease: "Out", overwrite: true });
    gsap.to(iconA, { rotate: -45, duration: DUR_M, ease: "InOut", overwrite: true });
    gsap.to(iconB, { rotate: 45, duration: DUR_M, ease: "InOut", overwrite: true });
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: DUR_M, ease: "Out", overwrite: true });
    animateTextA(accent, "reveal");
    animateTextH(heading, "reveal");
    animateTextP(copy, "reveal");
    animateCtn(links, "reveal");
    lockScroll();
  };
  const close = () => {
    isOpen = false;
    themed.forEach((el) => {
      if (el.hasAttribute("data-modal-themed")) {
        el.classList.remove("theme_on-dark");
        el.removeAttribute("data-modal-themed");
      }
    });
    labels.forEach((label) => label.classList.toggle("is-active"));
    gsap.to(container, {
      yPercent: 0,
      duration: DUR_M,
      ease: "In",
      overwrite: true,
      onComplete: () => {
        gsap.set([modal, overlay], { display: "none" });
      },
    });
    gsap.to([iconA, iconB], { rotate: 180, duration: DUR_M, ease: "InOut", overwrite: true });
    gsap.to(overlay, { opacity: 0, duration: DUR_M, ease: "In", overwrite: true });
    animateTextA(accent, "hide");
    animateTextH(heading, "hide");
    animateTextP(copy, "hide");
    animateCtn(links, "hide");
    unlockScroll();
  };

  button.addEventListener("click", () => (isOpen ? close() : open()));
  document.querySelectorAll('[data-modal-close="mob"]').forEach((el) => {
    el.addEventListener("click", () => {
      if (isOpen) close();
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) close();
  });
}

/** Floating labels, field filtering, UTM capture, and submission to the local endpoint. */
export function initBookingForm() {
  const form = document.querySelector<HTMLFormElement>("#wf-form-Book-a-call");
  if (!form) return;
  const block = form.closest(".w-form")!;
  const success = block.querySelector<HTMLElement>(".w-form-done")!;
  const failure = block.querySelector<HTMLElement>(".w-form-fail")!;
  const submit = form.querySelector<HTMLElement>("[data-form-btn]")!;
  const submitLabels = submit.querySelectorAll('[hover="text"]');

  form.querySelectorAll<HTMLInputElement>(".input_field").forEach((field) => {
    const label = field.parentElement!.querySelector(".input_label");
    if (!label) return;
    field.addEventListener("focusin", () => label.classList.add("focused"));
    field.addEventListener("focusout", () => {
      if (!field.value.trim()) label.classList.remove("focused");
    });
  });
  form.querySelectorAll<HTMLInputElement>('input[type="tel"]').forEach((field) => {
    field.addEventListener("input", () => {
      field.value = field.value.replace(/[^\d+\-]/g, "");
    });
  });

  const params = new URLSearchParams(window.location.search);
  const hidden: Record<string, string> = {
    title: "Deal from Era",
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_url: params.get("utm_url") ?? "",
    page_url: window.location.href,
  };
  Object.entries(hidden).forEach(([name, value]) => {
    const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (input) input.value = value;
  });

  const setLabel = (text: string) => submitLabels.forEach((el) => (el.textContent = text));

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    form.requestSubmit();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    failure.style.display = "none";
    setLabel("Sending...");
    try {
      const response = await fetch("/api/book-a-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.style.display = "none";
      success.style.display = "block";
    } catch {
      failure.style.display = "block";
      setLabel("Submit");
    }
  });
}
