import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout";
import TicTacToe from "../../components/tictactoe/tictactoeMenu"

export default function TicTacToeView()
{
    return (
        <Layout>
            <GameLayout>
                <h2 className="display-4 mb-4">Tic-Tac-Toebeans</h2>
                <TicTacToe />
            </GameLayout>
        </Layout> 
    )
}