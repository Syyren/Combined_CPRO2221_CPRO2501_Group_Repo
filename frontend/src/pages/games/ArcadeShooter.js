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
        <ArcadeShooter />
      </GameLayout>
    </Layout>
  );
}
