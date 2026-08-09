import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Display face — geometric and tight, for headings only. */
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/** Carries all metadata: labels, tags, counts. */
const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Business Analyst and Product Owner in Tampere, Finland. Requirement engineering, product ownership and Power BI analytics across IoT, ERP, HealthTech and Textile domains.";

export const metadata: Metadata = {
  title: {
    default: `${profile.shortName} — ${profile.title}`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  keywords: [
    "Business Analyst",
    "Product Owner",
    "Power BI",
    "Requirement Engineering",
    "Tampere",
    "Finland",
    "BRD",
    "SRS",
    "Data Analytics",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "en_GB",
    title: `${profile.shortName} — ${profile.title}`,
    description,
    siteName: `${profile.shortName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong palette. Kept inline and tiny for exactly that reason.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${grotesk.variable} ${mono.variable} flex min-h-full flex-col antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--on-accent)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
