import Image from "next/image";
import "./style.scss";
import {
  Cross,
  CrossIcon,
  Github,
  InfoIcon,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

const Header = () => {
  return (
    <header className="header grid">
      <div className="header-info">
        <div className="header-info-logo">
          <Image src="/icon.svg" alt="Logo" width={30} height={30} />
          Louis
        </div>
        <div className="header-info-socials">
          <div className="header-info-socials-block">
            <InfoIcon strokeWidth={1.4} />
          </div>
          <div className="header-info-socials-close">
            <X strokeWidth={1.4} />
          </div>
          <div className="header-info-socials-block">
            <Instagram strokeWidth={1.4} />
          </div>
          <div className="header-info-socials-block">
            <CrossIcon strokeWidth={1.4} />
          </div>
          <div className="header-info-socials-block">
            <Linkedin strokeWidth={1.4} />
          </div>
          <div className="header-info-socials-block">
            <Github strokeWidth={1.4} />
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="#">Crafts</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
