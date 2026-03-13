import "@/styles/global.scss";
import ReactLenis from "lenis/react";
import GridOverlay from "./GridOverlay";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Louis Descotes",
  description: "Développeur front-end et ui/ux designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Analytics />
      <ReactLenis root />
      <GridOverlay />
      <body>{children}</body>
    </html>
  );
}
