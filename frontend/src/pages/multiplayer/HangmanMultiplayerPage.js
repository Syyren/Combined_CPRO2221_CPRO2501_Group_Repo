import React from 'react';
import Layout from "../../components/Layout";
import GameLayout from "../../components/GameLayout";
import HangmanMultiplayer from "../../components/hangman/HangmanMultiplayer"; 

const HangmanMultiplayerPage = () => {
    return (
        <Layout>
            <GameLayout>
                <HangmanMultiplayer />
            </GameLayout>
        </Layout> 
    );
};

export default HangmanMultiplayerPage;
