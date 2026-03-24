"use client";

import { motion } from "motion/react";
import OptimizedVideo from "@/src/components/optimizedVideo";
import "./style.scss";
import Link from "next/link";
import PageTransition from "@/src/components/pageTransition";
import CraftList from "./video";

const Craft = () => {
  return (
    <PageTransition>
      <main className="craft">
        <motion.div
          initial={{ filter: "blur(4px)", opacity: 0, y: 10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="craft-links"
        >
          <Link className="type-16" href="/">
            Retour
          </Link>
        </motion.div>
        {Object.values(CraftList).map((video) => {
          return (
            <section key={video.name}>
              <OptimizedVideo
                src={`/crafts/${video.name}`}
                poster={`/crafts/${video.name}-poster.jpg`}
                blurDataURL={video.blurDataURL}
              />

              <div className="craft-tag">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`craft-tag-name craft-tag-name-${video.colorTag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </PageTransition>
  );
};
export default Craft;
