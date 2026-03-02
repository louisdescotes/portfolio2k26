import { ArrowUpRight } from "lucide-react";
import "./style.scss";
import Image from "next/image";

const NoemiePortfolioSection = () => {
  return (
    <section className="noemie-portfolio grid">
      <article className="noemie-portfolio-info">
        <div className="noemie-portfolio-info-title">
          <h2>Noémie portfolio</h2>
          <a
            className="noemie-portfolio-info-title-link"
            href="https://gaurois.vercel.app/"
          >
            https://gaurois.vercel.app/
            <ArrowUpRight color="#FC6605" />
          </a>
        </div>
        <div className="noemie-portfolio-info-description">
          <p className="noemie-portfolio-info-description-title">description</p>
          <p>react, threejs, webgl, motion, scss</p>
        </div>
        <div className="noemie-portfolio-info-description">
          <p className="noemie-portfolio-info-description-title">stack</p>
          <p>
            Réalisation d’un portfolio pour la photographe indépendante Noémie
            Gaurois, en mettant un focus sur l’expérience utilisateur afin de
            créer des émotions comme le créer ses photos
          </p>
        </div>
        <div className="noemie-portfolio-info-description">
          <p className="noemie-portfolio-info-description-title">date</p>
          <p>2025</p>
        </div>
      </article>
      <aside className="noemie-portfolio-presentation">
        <video
          width="740"
          height="450"
          controls
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/projects/noemiePortfolio/noemiePortfolio-intro.mp4"
            type="video/mp4"
          />
        </video>
        <video
          width="740"
          height="450"
          controls
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/projects/noemiePortfolio/noemiePortfolio-scroll.mp4"
            type="video/mp4"
          />
        </video>
        <video
          width="740"
          height="450"
          controls
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/projects/noemiePortfolio/noemiePortfolio-enterProject.mp4"
            type="video/mp4"
          />
        </video>
      </aside>
    </section>
  );
};
export default NoemiePortfolioSection;
