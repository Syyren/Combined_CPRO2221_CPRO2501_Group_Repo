package com.brcg.coolcatgames.feature.multiplayer.model;

import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.websockets.service.IMultiplayer;

public class HangmanGameStateMultiplayer  extends HangmanGameState implements IMultiplayer {

    public HangmanGameStateMultiplayer(char[] displayedWord, int guessesLeft, int totalScore, String gameStatus) {
        super(displayedWord, guessesLeft, totalScore, gameStatus);
    }

    @Override
    public void gameStateUpdate(String gameStateJson) {
        try {
            //unpack JSON string into a HangmanGameState object
            HangmanGameState gameState = getObjectMapper().readValue(gameStateJson, HangmanGameState.class);

            //update game with the new game state received from JSON
            this.setDisplayedWord(gameState.getDisplayedWord());
            this.setGuessesLeft(gameState.getGuessesLeft());
            this.setTotalScore(gameState.getTotalScore());
            this.setGameStatus(gameState.getGameStatus());
            System.out.println("Updated game state: " + this);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
