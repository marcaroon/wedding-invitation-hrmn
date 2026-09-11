import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan",
  description: "Berbagi kebahagiaan, merayakan cinta.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
