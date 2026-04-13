"use client";

import { motion } from "motion/react";
import "@styles/global.scss";
import "./style.scss";

const Home = () => {
  return (
    <div className="home container">
      <div className="animation-overflow">
        <motion.span
          className="subtitle"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          Louis Descotes
        </motion.span>
      </div>
      <h1 className="home-header">
        <div className="animation-overflow">
          <motion.span
            className="home-header-title type-80"
            initial={{ y: "150%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Front-end Developpeur
          </motion.span>
        </div>
        <div className="animation-overflow">
          <motion.span
            className="home-header-title type-80"
            initial={{ y: "150%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            UI/UX Designer
          </motion.span>
        </div>
      </h1>
    </div>
  );
};

export default Home;
