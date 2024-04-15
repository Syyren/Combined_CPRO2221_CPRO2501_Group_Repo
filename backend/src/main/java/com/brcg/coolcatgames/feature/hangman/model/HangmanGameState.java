package com.brcg.coolcatgames.feature.hangman.model;

import com.brcg.coolcatgames.websockets.service.IMultiplayer;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HangmanGameState {

    private char[] displayedWord;
    private int guessesLeft;
    private int totalScore;
    private String gameStatus;
}
