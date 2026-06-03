import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { content } from "@/content";
import MobileReserveBar from "@/components/MobileReserveBar";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  // Bodoni Moda has no metric-override data; skip the auto fallback to avoid
  // the harmless "Failed to find font override values" build warning.
  adjustFontFallback: false,
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://johnnysitaliansteakhouse.com"),
  title: {
    default: "Johnny's Italian Steakhouse — Prime Steaks & Supper Club",
    template: "%s — Johnny's Italian Steakhouse",
  },
  description:
    "Hand-cut steaks aged 28 days, house-made pasta, and a martini poured the old-fashioned way. An upscale Italian supper club with locations across the Midwest — find yours and reserve.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Johnny's Italian Steakhouse",
    title: "Johnny's Italian Steakhouse — Prime Steaks & Supper Club",
    description:
      "Hand-cut steaks aged 28 days, house-made pasta, and a martini poured the old-fashioned way. Pull up a chair in the supper club.",
    url: "https://johnnysitaliansteakhouse.com/",
    images: [content.hero.image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="bg-ink font-sans text-cream antialiased">
        <div className="grain" aria-hidden="true" />
        {children}
        <MobileReserveBar />
      </body>
    </html>
  );
}
