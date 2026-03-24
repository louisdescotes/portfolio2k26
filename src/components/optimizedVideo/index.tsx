"use client";

import { useRef, useEffect } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import "./style.scss";

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
      {isClient && blurDataURL && (
        <img
          aria-hidden="true"
          alt=""
          src={blurDataURL}
          className="optimized-video-wrapper-placeholder"
        />
      )}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        poster={poster}
        className="optimized-video"
        onCanPlay={(e) => {
          (e.target as HTMLVideoElement).style.opacity = "1";
        }}
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      >
        <source src={`${src}.webm`} type="video/webm; codecs=av01" />
        <source src={`${src}.mp4`} type='video/mp4; codecs="hvc1"' />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default OptimizedVideo;
