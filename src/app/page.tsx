"use client";

import "@styles/global.scss";
import Header from "../components/header";
import GridOverlay from "./GridOverlay";

const Home = () => {
  return (
    <>
      <GridOverlay />
      <main className="grid-p">
        <Header />
      </main>
    </>
  );
};

export default Home;
