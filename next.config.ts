import type { NextConfig } from "next";

// GSAP's SplitText and ScrollTrigger mutate the server-rendered DOM once, so the
// StrictMode double-effect in development would split text twice.
const nextConfig: NextConfig = { reactStrictMode: false };

export default nextConfig;
