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
        {CraftList.map((video, index) => {
          return (
            <section key={video}>
              <OptimizedVideo src={`/crafts/${video}`} />
            </section>
          );
        })}
      </main>
    </PageTransition>
  );
};
export default Craft;
