// components/OptimizedVideo.tsx
"use client";

import { useRef, useEffect } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
}

const OptimizedVideo = ({ src, className }: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    >
      <source src={`${src}.webm`} type="video/webm; codecs=av01" />
      <source src={`${src}.mp4`} type='video/mp4; codecs="hvc1"' />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
};

export default OptimizedVideo;
