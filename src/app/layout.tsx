import "@/styles/global.scss";
import ReactLenis from "lenis/react";

export const metadata = {
  title: "My Next Template",
  description: "Next.js starter",
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
