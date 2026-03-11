import "./style.scss";
import Link from "next/link";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-header">
        <h1 className="type-22">LOUIS DESCOTES</h1>
        <p className="type-16">in Building</p>
      </div>
      <div className="landing-links">
        <Link className="type-16" href="/craft">
          Craft
        </Link>
        <Link
          className="type-16"
          href="https://www.linkedin.com/in/louis-descotes/"
        >
          Linkedin
        </Link>
        <Link className="type-16" href="https://x.com/ldescotes1">
          Twitter
        </Link>
        <Link className="type-16" href="mailto:louis.descotes@gmail.com">
          Mail
        </Link>
      </div>
    </section>
  );
};
export default Landing;
