import "./style.scss";

const Landing = () => {
  return (
    <section className="landing grid">
      <h1 className="landing-title type-22">
        Je suis <b>développeur front-end</b> et <b>ui/ux designer</b>,
        actuellement en alternance chez{" "}
        <span className="landing-title-beease">Beease Digital</span>
        <br />
        <br />
        Passionné par le web et le design, je m’inspire des sites primés pour
        recréer et réinventer des effets interactifs captivant qui enrichissent
        l’expérience utilisateur
      </h1>
      <div className="landing-service">
        <h2>services</h2>
        <div className="landing-service-items">
          <p>Développement Front et Back</p>
          <p>Animations</p>
          <p>UI/UX Designer</p>
          <p>Threejs et Webgl intégration</p>
          <p>Intégration sous PayloadCMS</p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
