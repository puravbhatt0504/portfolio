import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Permanent_Marker, JetBrains_Mono, Caveat } from "next/font/google";

import { AudioProvider } from "@/components/providers/audio-provider";
import { HeroSideNav } from "@/components/navigation/hero-side-nav";

import { SoundToggle } from "@/components/ui/sound-toggle";
import { GlobalBackground } from "@/components/ui/global-background";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const plexSansFont = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
  subsets: ["latin"],
});

const permanentMarkerFont = Permanent_Marker({
  weight: "400",
  variable: "--font-permanent-marker",
  subsets: ["latin"],
});

const caveatFont = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// Production must never fall back to localhost: that is what broke link
// previews. NEXT_PUBLIC_SITE_URL still overrides (e.g. for preview deploys).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : siteConfig.url);

// og:image / twitter:image come from the opengraph-image.tsx and
// twitter-image.tsx file conventions, resolved against metadataBase.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    siteName: `${siteConfig.name} Portfolio`,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSansFont.variable} ${permanentMarkerFont.variable} ${caveatFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <AudioProvider>
          <GlobalBackground />

          <HeroSideNav />
          <SoundToggle />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
