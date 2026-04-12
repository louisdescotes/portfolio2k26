"use client";

import { motion } from "motion/react";
import "@styles/global.scss";
import "./style.scss";
import Button from "@/src/components/button";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-container-header">
          <span className="subtitle">A propos de moi</span>
          <h1 className="about-container-header-title type-40">hello</h1>
        </div>
        <p className="about-container-description">
          Moi c’est Louis, je suis développeur front-end et ui/ux designer,
          actuellement en alternance chez Beease Digital
        </p>
        <p className="about-container-description">
          Passionné par le web et le design, je m’inspire des sites primés pour
          recréer et réinventer des effets interactifs captivant qui
          enrichissent l’expérience utilisateur
        </p>
        <div className="about-container-services">
          <span className="subtitle">Services</span>
          <p className="about-container-services-detail">
            Front-end development, UX/UI Design, PayloadCMS intégration
          </p>
        </div>
        <div className="about-container-socials">
          <Button text="mail" href="mailto:ldescotes1@gmail.com" />
          <Button text="git" href="https://github.com/louisdescotes" blank />
          <Button
            text="linkedin"
            href="https://www.linkedin.com/in/louis-descotes/"
            blank
          />
          <Button text="x" href="https://x.com/ldescotes1" blank />
        </div>
      </div>
      {/* <div className="animation-overflow">
        <motion.span
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          Page A
        </motion.span>
      </div>
      <h1 className="test">
        <div className="animation-overflow">
          <motion.span
            className="title"
            initial={{ y: "150%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            See the docs for setup
          </motion.span>
        </div>
        <div className="animation-overflow">
          <motion.span
            className="title"
            initial={{ y: "150%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            and customization
          </motion.span>
        </div>
      </h1>
    </div> */}
    </div>
  );
};

export default About;
