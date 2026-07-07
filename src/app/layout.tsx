import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";

import { AudioProvider } from "@/components/providers/audio-provider";
import { HeroSideNav } from "@/components/navigation/hero-side-nav";

import { SoundToggle } from "@/components/ui/sound-toggle";
import { GlobalBackground } from "@/components/ui/global-background";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const headingFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
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
  themeColor: "#f8fafc",
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
      className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
