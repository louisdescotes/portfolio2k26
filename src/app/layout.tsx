import "@/styles/global.scss";
import ReactLenis from "lenis/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";
import PageController from "../components/pageController";

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
    <ViewTransitions>
      <html lang="fr">
        <body>
          <ReactLenis root>
            <PageController>{children}</PageController>
          </ReactLenis>
        </body>
        <SpeedInsights />
        <Analytics />
      </html>
    </ViewTransitions>
  );
}
