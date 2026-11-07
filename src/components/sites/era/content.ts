import type { ImageKey } from "./assets";
import { APARTMENTS_URL } from "./shared";

export const PINS = [
  {
    id: "crafted-to-endure",
    title: "Crafted to Endure",
    body: "Natural stone façades were selected for their timeless appearance, durability and ease of maintenance, allowing the architecture to age beautifully over time",
  },
  {
    id: "light-flow",
    title: "Light & Flow",
    body: "Terraces, rooftop solariums and expansive openings maximize natural light while creating a seamless indoor outdoor lifestyle.",
  },
  {
    id: "your-private-sanctuary",
    title: "Your Private Sanctuary",
    body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
  },
];

const COMMUNITY_CAPTION = "Designed as a community, not a complex";

export const BENEFITS: { title: string; image: ImageKey; body: string; caption: string }[] = [
  {
    title: "Real-Life Location",
    image: "img_cam_02-57dd0",
    body: "Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs, Era Residence offers a rare balance of seclusion and seamless access to the finest Mediterranean lifestyle.",
    caption: COMMUNITY_CAPTION,
  },
  {
    title: "Built to stay",
    image: "era-residence-terrace-f2cd5",
    body: "Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.",
    caption: COMMUNITY_CAPTION,
  },
  {
    title: "Boutique concept",
    image: "era-residence-garden",
    body: "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
    caption: COMMUNITY_CAPTION,
  },
];

export const APARTMENT_TYPES: {
  title: string;
  bedrooms: string;
  area: string;
  body: string;
  cta: string;
  href: string;
  image: ImageKey;
}[] = [
  {
    title: "Ground floor + basement",
    bedrooms: "3",
    area: "178 — 202 m²",
    body: "Private basement, direct outdoor access and a dedicated lower level.",
    cta: "Explore Ground + basement",
    href: `${APARTMENTS_URL}?type=ground-floor-basement`,
    image: "era-residence-ground-floor-basement",
  },
  {
    title: "Ground Floor",
    bedrooms: "2",
    area: "97 — 104 m²",
    body: "Step directly onto your terrace and into the communal gardens, blending indoor comfort with outdoor living.",
    cta: "Explore Ground floor",
    href: `${APARTMENTS_URL}?type=ground-floor`,
    image: "era-residence-landscaping-5ec64",
  },
  {
    title: "Penthouse duplex",
    bedrooms: "2-3",
    area: "124 — 243 m²",
    body: "Two floors crowned with panoramic views and a private rooftop solarium — the ultimate expression of luxury living.",
    cta: "Explore Penthouses",
    href: `${APARTMENTS_URL}?type=penthouse-duplex`,
    image: "era-residence-terrace-f5964",
  },
];

export const AMENITIES: { id: string; name: string; body: string; image: ImageKey }[] = [
  {
    id: "gated-community",
    name: "Gated community",
    body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard",
    image: "era-residence-gated-community",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    body: "Saltwater swimming pool, Children’s pool, Sauna, jacuzzi and wellness shower",
    image: "era-residence-pool",
  },
  {
    id: "parking-area",
    name: "Parking area",
    body: "Each parking space includes pre-installation for optional EV charging.",
    image: "era-residence-parking",
  },
  {
    id: "spa-gym",
    name: "Spa & gym",
    body: "Designed exclusively for residents and their guests, the amenities at ERA encourage a slower and more balanced Mediterranean lifestyle",
    image: "era-residence-spa-gym",
  },
  {
    id: "landscaping",
    name: "Landscaping",
    body: "The landscaping concept was designed to soften the architecture and strengthen the connection between the residences and the Mediterranean environment.",
    image: "era-residence-landscaping-db288",
  },
];

export const GALLERY: ImageKey[] = ["img_cam_03", "img_cam_07", "img_cam_09", "era-residence-kitchen"];

export const FACTS: { title: string; body?: string; logoBody?: string }[] = [
  { title: "Developer", body: "Swiss Technology S.L." },
  { title: "Sales & Marketing", logoBody: "Unreal Estate Group" },
  {
    title: "License obtained",
    body: "The project holds all required permits and an active construction license. All documentation is publicly available. Construction is already underway — visit the site in person or follow progress via our live online stream.",
  },
  {
    title: "2026",
    body: "Currently under construction. The first phase of construction is underway, with ongoing development of the apartments and communal areas. Potential buyers can anticipate a modern living space upon completion of the build.",
  },
];
