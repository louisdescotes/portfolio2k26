import "@/styles/global.scss";
import ReactLenis from "lenis/react";

export const metadata = {
  title: "Louis Descotes - Portfolio",
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
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
