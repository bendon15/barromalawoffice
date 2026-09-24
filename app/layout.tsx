import type { Metadata } from "next";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "BarromaLaw | Law Office in General Trias City, Cavite",
  description:
    "BarromaLaw is the law office of Atty. Joseph A.T. Barroma in General Trias City, Cavite. Onsite and online legal consultations, document drafting and notarization, case representation and retainership.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy-deep text-navy antialiased">{children}</body>
    </html>
  );
}
