# era-residence.com homepage brief

Source: Webflow markup and CSS, with behaviour in a Slater module (GSAP 3.15, ScrollTrigger, SplitText, CustomEase, Lenis 1.3.21, Barba, Lottie). Local URL mappings are in `asset-map.json`.

## Route map

| Source | Local | Notes |
| --- | --- | --- |
| `/` | `/` | Cloned |
| `/apartments`, `/apartments?type=*` | Source URL | Out of scope |
| `/contact` | Source URL | Out of scope |
| Privacy and terms PDFs, socials, maps, agency | Source URL | Outbound |

## Section order

Preloader, cookie banner, fixed header and scroll rail, hero (day/night, 3 pins), benefits arch, benefits slider, quote, location track (concept, New Golden Mile, coast route), master plan with clouds, apartment types slider, apartment info, amenities tabs, interior with gallery, architecture, facts accordion, CTA, footer, booking modal, mobile menu.

## Rules that drive the layout

- `html { font-size: 1vw }`, and all sizes are `rem` divided by a scale ratio, so the page scales without a max-width. Measured rem: 11px at 1100, 14.4 at 1440, 19.2 at 1920, 25.6 at 2560.
- Breakpoint: 992px. On the source, the location track stacks below it, the architecture intro is removed, and snapping and the scroll rail are off. This clone deliberately differs: it runs the desktop scroll scenes on phones and tablets too, using `mobile-motion.css`.
- Source scroll heights, matched by the clone from 992px up: 24605 at 1440x900, 31547 at 1920x1080, 40593 at 2560x1300, 22505 at 1440x700, 19977 at 1100x800. Below 992px the clone is intentionally longer: 20593 against the source's 14782 at 390x844, and 32866 against 27646 at 768x1024.

## Behaviour

| Driver | Behaviour | Code |
| --- | --- | --- |
| Time | Preloader: 6.74s to the arch, 10.16s total; short version on repeat visits in a session | `motion/preloader.ts` |
| Time | Sliders advance every 6s while 20% visible; clouds 32s linear loop; header ring 30deg/s | `motion/widgets.ts`, `era.css`, `motion/hover.ts` |
| Scroll | Lenis 1.2s; snap settles on `[data-snap]` 40ms after scrolling stops (desktop) | `motion/scroll.ts` |
| Scroll | Hero pan and zoom, horizontal track, amenities zoom, architecture mask, footer clip | `motion/flow.ts` |
| Scroll | One-time reveals; parallax; flowers play only while in view | `motion/reveal.ts`, `motion/widgets.ts` |
| Click | Day/night, slider arrows, amenity tabs, accordion, booking modal, mobile menu, cookies | `motion/widgets.ts`, `motion/overlays.ts` |
| Hover | Magnetic circle button, character swaps, pin tooltips, Lottie credit (desktop) | `motion/hover.ts` |

Barba page transitions are not reproduced because only one route is cloned.
