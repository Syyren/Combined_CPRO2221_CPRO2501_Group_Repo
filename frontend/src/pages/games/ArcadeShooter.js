import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout";
import ArcadeShooter from "../../components/arcadeshooter/ArcadeShooter";

/**
 * Home page component.
 */
export default function Home() {
  return (
    <Layout>
      <GameLayout>
        <h2 className="display-4 mb-4">Canine Invaders</h2>
        <ArcadeShooter />
      </GameLayout>
    </Layout>
  );
}
