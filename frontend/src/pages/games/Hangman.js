import Layout from "../../components/Layout";
import Hangman from "../../components/hangman/Hangman";

export default function Home()
{
    return (
        <Layout>
            <h2 className="display-4 mb-4">Hangman</h2>
            <Hangman/>
        </Layout> 
    )
}