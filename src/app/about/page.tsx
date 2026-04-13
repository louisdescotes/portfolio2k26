"use client";

import { motion } from "motion/react";
import "@styles/global.scss";
import "./style.scss";
import Button from "@/src/components/button";

const About = () => {
  return (
    <div className="about container">
      <div className="about-header">
        <div className="animation-overflow">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="about-header-title"
          >
            Hello
          </motion.h1>
        </div>
      </div>
      <div className="about-description">
        <div className="animation-overflow">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="subtitle"
          >
            A propos de moi
          </motion.span>
        </div>
        <p className="about-description-me">
          Moi c'est Louis Descotes, développeur front-end et ui/ux designer en
          alternance chez{" "}
          <span className="about-description-me-job">
            <a target="_blank" rel="noopener" href="https://beease.fr/">
              @Beease Digital
            </a>
          </span>{" "}
          à Strasbourg, France.
        </p>
        <p className="about-description-me">
          Passionné par le web et le design, je m’inspire des sites primés pour
          recréer et réinventer des effets interactifs captivant qui
          enrichissent l’expérience utilisateur
        </p>
        <div className="about-description-others">
          <div className="about-description-others-services">
            <div className="animation-overflow">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="subtitle"
              >
                Services
              </motion.span>
            </div>
            <ul className="about-description-others-services-detail">
              <li>Front-end développement</li>
              <li>Motion</li>
              <li>UX/UI Design</li>
              <li>Headless CMS intégration</li>
              <li>PayloadCMS</li>
            </ul>
          </div>
          <div className="about-description-others-socials">
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
