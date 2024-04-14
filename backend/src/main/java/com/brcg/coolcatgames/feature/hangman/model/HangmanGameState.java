package com.brcg.coolcatgames.feature.hangman.model;

import com.brcg.coolcatgames.websockets.service.IMultiplayer;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HangmanGameState implements IMultiplayer {

    private char[] displayedWord;
    private int guessesLeft;
    private int totalScore;
    private String gameStatus;
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
