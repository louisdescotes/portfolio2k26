"use client";

import "@styles/global.scss";
import Landing from "./pages/landing";
import PageTransition from "../components/pageTransition";

const Home = () => {
  return (
    <PageTransition>
      <main>
        <Landing />
      </main>
    </PageTransition>
  );
};

export default Home;
