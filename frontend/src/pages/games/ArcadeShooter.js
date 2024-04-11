import Layout from "../../components/Layout";
import ArcadeShooter from "../../components/arcadeshooter/ArcadeShooter";

export default function Home() {
  return (
    <Layout>
      <h2 className="display-4 mb-4">Canine Invaders</h2>
      <ArcadeShooter />
    </Layout>
  );
}
