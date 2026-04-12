"use client";

import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import "./style.scss";
import Image from "next/image";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  blurDataURL?: string;
  className?: string;
}

const OptimizedVideo = ({
  src,
  poster,
  blurDataURL,
  className,
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          observer.disconnect();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`optimized-video-wrapper ${className ?? ""}`}>
      <motion.div
        initial={{ y: "200px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="optimized-video"
      >
        {isClient && blurDataURL && (
          <Image
            aria-hidden="true"
            alt=""
            width={629}
            height={353}
            src={blurDataURL}
            className="optimized-video-placeholder"
          />
        )}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={(e) => {
            (e.target as HTMLVideoElement).style.opacity = "1";
          }}
        >
          <source src={`${src}.webm`} type="video/webm; codecs=av01" />
          <source src={`${src}.mp4`} type='video/mp4; codecs="hvc1"' />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
};

export default OptimizedVideo;
