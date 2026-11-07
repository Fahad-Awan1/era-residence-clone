import "lenis/dist/lenis.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/components/sites/era/era.css";
import "@/components/sites/era/mobile-motion.css";

const TITLE = "ERA Residence — Contemporary Mediterranean Residences in Estepona";
const DESCRIPTION =
  "Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  icons: {
    icon: [
      { url: "/sites/era/images/fav_512x512-747e4.png", sizes: "32x32", type: "image/png" },
      { url: "/sites/era/images/fav_512x512-5b425.png", sizes: "48x48", type: "image/png" },
      { url: "/sites/era/images/fav_512x512-b77b8.png", sizes: "192x192", type: "image/png" },
      { url: "/sites/era/images/fav_512x512-d31d4.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/sites/era/images/fav_512x512-9955e.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts kit used by the source site: Ambroise François and Sloop Script. */}
        <link rel="stylesheet" href="https://use.typekit.net/pig8glj.css" />
      </head>
      <body className="body">{children}</body>
    </html>
  );
}
