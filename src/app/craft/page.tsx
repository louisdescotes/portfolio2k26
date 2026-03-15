import OptimizedVideo from "@/src/components/optimizedVideo";
import "./style.scss";

const Craft = () => {
  return (
    <main className="craft">
      <section>
        <OptimizedVideo src="/crafts/xp1" />
      </section>
      <section>
        <OptimizedVideo src="/crafts/xp2" />
      </section>
      <section>
        <OptimizedVideo src="/crafts/xp3" />
      </section>
    </main>
  );
};
export default Craft;
