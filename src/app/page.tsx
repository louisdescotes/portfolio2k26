import ParalaxImage from "../components/paralaxImage";
import TextAppear from "../components/textAppear";

const Home = () => {
  return (
    <main className="grid-p">
      <header>
        <p>HEADER</p>
      </header>
      <p className="type-16">Text 16</p>
      <p className="type-18">Text 18</p>
      <p className="type-22">Text 22</p>
      <p className="type-32">Text 32</p>
      <p className="type-40">Text 40</p>
      <p className="type-45">Text 45</p>
      <p className="type-80">Text 80</p>
      <p className="type-120">Text 120</p>
      <section
        style={{
          height: "fit-content",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ParalaxImage img="/home.jpg" alt="image" width={800} height={400} />
      </section>
      <section
        style={{
          height: "fit-content",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "24px",
          paddingBottom: "20svh",
        }}
      >
        <TextAppear
          className="type-22"
          text="Founded in 1999, Golden Ratio is a family-led company of engineers and architects, working across design and construction. Our strength lies in the collective — a team of specialists from different disciplines, aligned by a shared mindset and a hands-on approach.
          Founded in 1999, Golden Ratio is a family-led company of engineers and architects, working across design and construction. Our strength lies in the collective — a team of specialists from different disciplines, aligned by a shared mindset and a hands-on approach
          Founded in 1999, Golden Ratio is a family-led company of engineers and architects, working across design and construction. Our strength lies in the collective — a team of specialists from different disciplines, aligned by a shared mindset and a hands-on approach"
        />
      </section>
    </main>
  );
};
export default Home;
