"use client";

import "@styles/global.scss";
import Header from "../components/header";
import Landing from "./pages/landing";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Landing />
      </main>
    </>
  );
};

export default Home;
