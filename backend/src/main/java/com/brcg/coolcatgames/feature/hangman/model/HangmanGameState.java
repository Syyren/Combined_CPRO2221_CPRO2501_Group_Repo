package com.brcg.coolcatgames.feature.hangman.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HangmanGameState {

    private char[] displayedWord;
    private int guessesLeft;
    private int totalScore;
    private String gameStatus;
    private List<Character> lettersGuessed;
    private String turnTaken;
}
