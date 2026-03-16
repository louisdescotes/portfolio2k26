import "@/styles/global.scss";
import ReactLenis from "lenis/react";
import GridOverlay from "./GridOverlay";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <body>
        <ReactLenis root>
          <GridOverlay />
          {children}
          <Analytics />
          <SpeedInsights />
        </ReactLenis>
      </body>
    </html>
  );
}
