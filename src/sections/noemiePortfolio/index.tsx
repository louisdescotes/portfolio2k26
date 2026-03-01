import { ArrowUpRight } from "lucide-react";
import "./style.scss";
import Image from "next/image";

const NoemiePortfolioSection = () => {
  return (
    <section className="noemie-portfolio grid">
      <article className="noemie-portfolio-info">
        <div className="noemie-portfolio-info-title">
          <h2>Noémie portfolio</h2>
          <div>
            <a href="https://gaurois.vercel.app/">
              https://gaurois.vercel.app/
            </a>
            <ArrowUpRight />
          </div>
        </div>
        <div>
          <p>description</p>
          <p>react, threejs, webgl, motion, scss</p>
        </div>
        <div>
          <p>stack</p>
          <p>
            Réalisation d’un portfolio pour la photographe indépendante Noémie
            Gaurois, en mettant un focus sur l’expérience utilisateur afin de
            créer des émotions comme le créer ses photos
          </p>
        </div>
        <div>
          <p>date</p>
          <p>2025</p>
        </div>
      </article>
      <aside className="noemie-portfolio-images">
        <Image
          width={740}
          height={450}
          src="/test.png"
          alt="noemie portfolio"
        />
        <Image
          width={740}
          height={450}
          src="/test.png"
          alt="noemie portfolio"
        />
        <Image
          width={740}
          height={450}
          src="/test.png"
          alt="noemie portfolio"
        />
        <Image
          width={740}
          height={450}
          src="/test.png"
          alt="noemie portfolio"
        />
      </aside>
    </section>
  );
};
export default NoemiePortfolioSection;
