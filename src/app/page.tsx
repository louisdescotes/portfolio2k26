"use client";

import "@styles/global.scss";
import Landing from "./pages/landing";
import PageTransition from "../components/pageTransition";

const Home = () => {
  return (
    <PageTransition>
      <Landing />
    </PageTransition>
  );
};

export default Home;
