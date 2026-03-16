"use client";
import { motion } from "motion/react";
import { useIsClient } from "@/hooks/useIsClient";

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  const isClient = useIsClient();

  return (
    <motion.div
      initial={{ filter: "blur(4px)", opacity: 0 }}
      animate={
        isClient
          ? { filter: "blur(0px)", opacity: 1 }
          : { filter: "blur(4px)", opacity: 0 }
      }
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
