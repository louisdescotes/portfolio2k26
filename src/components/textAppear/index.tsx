"use client";

import "./style.scss";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface Props {
  text: string;
  className: string;
}

export default function TextAppear({ text, className }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const words = text.split(" ");
    let line: string[] = [];
    const output: string[] = [];

    textEl.innerHTML = "";

    words.forEach((word) => {
      textEl.innerHTML = [...line, word].join(" ");

      if (textEl.scrollWidth > textEl.clientWidth) {
        output.push(line.join(" "));
        line = [word];
        textEl.innerHTML = word;
      } else {
        line.push(word);
      }
    });

    if (line.length) output.push(line.join(" "));

    setLines(output);
  }, [text]);

  return (
    <>
      <div ref={textRef} className="textAppear" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {lines.map((line, index) => (
          <div className="textAppear-line" key={index}>
            <motion.p
              className={`${className}`}
              variants={{
                hidden: { y: "100%" },
                visible: { y: "0%" },
              }}
              transition={{
                type: "spring",
                damping: 80,
                stiffness: 500,
                delay: index * 0.1,
              }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </motion.div>
    </>
  );
}
