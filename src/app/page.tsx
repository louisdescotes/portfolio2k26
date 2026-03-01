"use client";

import "@styles/global.scss";

import Header from "../components/header";
import Landing from "../sections/landing";
import NoemiePortfolioSection from "../sections/noemiePortfolio";
import VisualGrid from "./visualsGrid";

const Home = () => {
  return (
    <main className="grid-p">
      {/* <VisualGrid /> */}
      <Header />
      <Landing />
      <NoemiePortfolioSection />
    </main>
  );
};
export default Home;
