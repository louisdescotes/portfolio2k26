"use client";

import OptimizedVideo from "@/src/components/optimizedVideo";
import "./style.scss";
import CraftList from "./video";

const Craft = () => {
  return (
    <div className="craft">
      {Object.values(CraftList).map((video) => {
        return (
          <section className="craft-wrapper" key={video.name}>
            <OptimizedVideo
              src={`/crafts/${video.name}`}
              poster={`/crafts/${video.name}-poster.jpg`}
              blurDataURL={video.blurDataURL}
            />
          </section>
        );
      })}
    </div>
  );
};
export default Craft;
