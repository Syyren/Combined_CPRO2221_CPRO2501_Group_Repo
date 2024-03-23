import Layout from "../components/Layout";
import Leaderboard from "../components/leaderboard/Leaderboard";

export default function Home() {
  return (
    <Layout>
      <h2 className="display-4 mb-4">Leaderboard Test Page</h2>
      <Leaderboard />
    </Layout>
  );
}
