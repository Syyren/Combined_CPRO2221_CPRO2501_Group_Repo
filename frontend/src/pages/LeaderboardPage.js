import React from "react";
import Layout from "../components/Layout";
import Leaderboard from "../components/leaderboard/Leaderboard";

/**
 * Home page component displaying the leaderboard.
 */
export default function Home() {
  return (
    <Layout>
      <h2 className="display-4 mb-4">Leaderboard</h2>
      <Leaderboard />
    </Layout>
  );
}
