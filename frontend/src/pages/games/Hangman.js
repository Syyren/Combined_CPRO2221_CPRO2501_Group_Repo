import Layout from "../../components/Layout";
import Score from "../../components/hangman/Score";
import Gallow from "../../components/hangman/Gallow";
import Word from "../../components/hangman/Word";
import Alphabet from "../../components/hangman/Alphabet";



export default function Home()
{
    return(
        <Layout>
            <h2 className="display-4 mb-4">Hangman</h2>
            <Score />
            <Gallow />
            <Word />
            <Alphabet />
        </Layout> 
    )
}