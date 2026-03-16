import "./style.scss";
import Link from "next/link";
import { motion } from "motion/react";
import { useIsClient } from "@/hooks/useIsClient";

const Landing = () => {
  const isClient = useIsClient();

  return (
    <main className="landing">
      <motion.div
        initial={{ filter: "blur(4px)", opacity: 0, y: 10 }}
        animate={
          isClient
            ? { filter: "blur(0px)", opacity: 1, y: 0 }
            : { filter: "blur(4px)", opacity: 0, y: 10 }
        }
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 1,
        }}
        className="landing-second"
      >
        <Link
          className="type-16"
          href="https://www.linkedin.com/in/louis-descotes/"
          target="_blank"
        >
          Linkedin
        </Link>
        <Link
          className="type-16"
          href="https://x.com/ldescotes1"
          target="_blank"
        >
          Twitter
        </Link>
        <Link
          className="type-16"
          href="mailto:louis.descotes@gmail.com"
          target="_blank"
        >
          Mail
        </Link>
      </motion.div>

      <div className="landing-header">
        <AnimatedHeading text="Louis DESCOTES" isClient={isClient} />
        <AnimatedHeading
          delay={0.1}
          as="h2"
          text="Developpeur front-end et UI/UX Designer"
          isClient={isClient}
        />
      </div>

      <motion.div
        initial={{ filter: "blur(4px)", opacity: 0, y: 10 }}
        animate={
          isClient
            ? { filter: "blur(0px)", opacity: 1, y: 0 }
            : { filter: "blur(4px)", opacity: 0, y: 10 }
        }
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.8,
        }}
        className="landing-links"
      >
        <Link className="type-16" href="/craft">
          Craft
        </Link>
      </motion.div>
    </main>
  );
};

export default Landing;

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface AnimatedHeadingProps {
  text: string;
  as?: HeadingTag;
  staggerDelay?: number;
  delay?: number;
  isClient: boolean;
}

const AnimatedHeading = ({
  text,
  as: Tag = "h1",
  delay = 0,
  staggerDelay = 0.06,
  isClient,
}: AnimatedHeadingProps) => {
  const words = text.split(" ");

  return (
    <Tag className="landing-header-title">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`landing-header-title-word landing-header-title-word-${Tag}`}
          initial={{ filter: "blur(4px)", opacity: 0, y: 10 }}
          animate={
            isClient
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : { filter: "blur(4px)", opacity: 0, y: 10 }
          }
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * staggerDelay,
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
};
