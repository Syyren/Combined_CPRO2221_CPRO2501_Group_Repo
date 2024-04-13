import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout"
import Hangman from "../../components/hangman/Hangman";

export default function HangmanView()
{
    return (
        <Layout>
            <GameLayout>
                <h2 className="display-4 mb-4">Hangman</h2>
                <Hangman/>
            </GameLayout>
        </Layout> 
    )
}