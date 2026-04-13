import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";

import { AudioProvider } from "@/components/providers/audio-provider";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SoundToggle } from "@/components/ui/sound-toggle";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const headingFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purav Bhatt | Portfolio",
  description: "Interactive developer portfolio of Purav Bhatt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AudioProvider>
          <CustomCursor />
          <FloatingNav />
          <SoundToggle />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
