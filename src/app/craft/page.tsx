"use client";

import { motion } from "motion/react";
import OptimizedVideo from "@/src/components/optimizedVideo";
import "./style.scss";
import CraftList from "./video";

const Craft = () => {
  return (
    <div className="craft container">
      <div className="craft-header animation-overflow">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="craft-header-title"
        >
          Craft
        </motion.h1>
      </div>
      {Object.values(CraftList).map((video) => {
        return (
          <section className="craft-wrapper" key={video.name}>
            <OptimizedVideo
              src={`/crafts/${video.name}`}
              poster={`/crafts/${video.name}-poster.jpg`}
              blurDataURL={video.blurDataURL}
            />
          </section>
        );
      })}
    </div>
  );
};
export default Craft;
