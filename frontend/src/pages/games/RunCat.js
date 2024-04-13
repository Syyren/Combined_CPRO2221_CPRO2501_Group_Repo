import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout";
import AutoRunner from "../../components/autorunner/AutoRunner";

export default function RunCatView()
{
    return (
        <Layout>
            <GameLayout>
                <h2 className="display-4 mb-4">Run Cat!</h2>
                <AutoRunner/>
            </GameLayout>
        </Layout> 
    )
}