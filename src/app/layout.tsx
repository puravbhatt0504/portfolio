import type { Metadata, Viewport } from "next";
import { Outfit, Permanent_Marker, JetBrains_Mono, Caveat } from "next/font/google";

import { AudioProvider } from "@/components/providers/audio-provider";
import { HeroSideNav } from "@/components/navigation/hero-side-nav";

import { SoundToggle } from "@/components/ui/sound-toggle";
import { GlobalBackground } from "@/components/ui/global-background";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const outfitFont = Outfit({
  variable: "--font-outfit",
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
    url: siteUrl,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"],
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
      className={`${outfitFont.variable} ${permanentMarkerFont.variable} ${caveatFont.variable} ${monoFont.variable} h-full antialiased`}
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
