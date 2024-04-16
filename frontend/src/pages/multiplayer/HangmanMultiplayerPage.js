import React from 'react';
import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout";
import HangmanMultiplayer from "../../components/hangman/HangmanMultiplayer"; // Import the presentation component

const HangmanMultiplayerPage = () => {
    return (
        <Layout>
            <GameLayout>
                <h2 className="display-4 mb-4">Hangman</h2>
                <HangmanMultiplayer />
            </GameLayout>
        </Layout> 
    );
};

export default HangmanMultiplayerPage;
