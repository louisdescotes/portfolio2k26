import "@/styles/global.scss";
import ReactLenis from "lenis/react";

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
      <ReactLenis root />
      <body>{children}</body>
    </html>
  );
}
