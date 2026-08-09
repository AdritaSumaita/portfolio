import type { NextConfig } from "next";

/**
 * Static export configuration.
 *
 * The site is fully pre-rendered to HTML at build time, so it can be hosted on
 * GitHub Pages, Vercel or Netlify with no server. Set BASE_PATH when deploying
 * to a GitHub Pages project site (e.g. BASE_PATH=/power_BI_projects) — leave it
 * unset for Vercel/Netlify or a custom domain.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // The static exporter cannot run the on-demand image optimiser.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
