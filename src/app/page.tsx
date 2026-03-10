"use client";

import "@styles/global.scss";
import Header from "../components/header";
import GridOverlay from "./GridOverlay";
import Landing from "./pages/landing";

const Home = () => {
  return (
    <>
      <GridOverlay />
      <Header />
      <main>
        <Landing />
      </main>
    </>
  );
};

export default Home;
