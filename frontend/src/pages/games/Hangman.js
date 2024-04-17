import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout"
import Hangman from "../../components/hangman/Hangman";

export default function HangmanView()
{
    return (
        <Layout>
            <GameLayout>
                <Hangman/>
            </GameLayout>
        </Layout> 
    )
}