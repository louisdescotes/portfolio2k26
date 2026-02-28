"use client";

import "./style.scss";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

interface Props {
  img: string;
  alt: string;
  width: number;
  height: number;
}

const ParalaxImage = ({ img, alt, width, height }: Props) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div ref={ref} className="paralaxImage" style={{ height, width }}>
      <motion.div className="paralaxImage-container" style={{ y }}>
        <Image
          className="paralaxImage-container-img"
          src={img}
          alt={alt}
          width={width}
          height={height}
          priority={false}
        />
      </motion.div>
    </div>
  );
};
export default ParalaxImage;
