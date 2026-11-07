# ERA Residence homepage clone

A local Next.js rebuild of https://www.era-residence.com/ for reference and portfolio study. The text, imagery, video, fonts and brand belong to their owners. It is not affiliated with ERA Residence.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

The preloader's long version plays once per browser session. Clear `sessionStorage` to see it again, and clear the `cookies` key in `localStorage` to bring the cookie banner back.

## Layout

| Path | Contents |
| --- | --- |
| `src/app/page.tsx` | Section order |
| `src/components/sites/era/content.ts` | Editable copy for pins, sliders, amenities and facts |
| `src/components/sites/era/sections/` | Page sections |
| `src/components/sites/era/shared.tsx` | Buttons, labels, flower video and frame decor |
| `src/components/sites/era/motion/` | GSAP and Lenis behaviour, started by `EraMotion.tsx` |
| `src/components/sites/era/era.css` | Source design rules pruned to this page |
| `public/sites/era/` | Mirrored images, video, fonts and Lottie |
| `docs/research/era/` | Page brief, asset map and comparison screenshots |

Sections are server-rendered once and `motion/` then changes that DOM directly (text splitting, inline transforms). Don't add client state that re-renders those sections, because React would conflict with those changes.

## Before publishing anywhere

- **Form:** `/api/book-a-call` validates and returns success without storing or sending anything, yet the page says "We've received your request". Connect a real backend or remove the form.
- **Fonts:** Ambroise François and Sloop Script load from the source site's Adobe Fonts kit (`src/app/layout.tsx`), and Maison Neue Extended is a copy of the source's file. All three need your own licence.
- **Content:** the photography, renders, video, copy and brand need the owner's permission.
- **Phone and links:** the footer number was changed to a personal number for local viewing, next to ERA's name, sales office and links, so this version must stay private. `/apartments` and `/contact` still go to the live site.
