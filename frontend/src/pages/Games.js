import Layout from "../components/Layout";
import GameLayout from "../components/GameLayout";

export default function Home()
{
    return (
        <Layout>
            <GameLayout>
                <h2 className="display-4 mb-4">Check out our Games!</h2>
            </GameLayout>
        </Layout> 
    )
}