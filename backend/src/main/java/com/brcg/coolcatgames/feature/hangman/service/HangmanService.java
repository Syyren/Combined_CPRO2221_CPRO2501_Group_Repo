package com.brcg.coolcatgames.feature.hangman.service;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import org.springframework.stereotype.Service;

@Service
public class HangmanService {

    private final Hangman hangman = new Hangman();

    public HangmanGameState getGameState() {
        return new HangmanGameState(
                hangman.getDisplayedWord(),
                hangman.getGuesses(),
                hangman.getTotalScore(),
                hangman.getGameStatus(),
                hangman.getLettersGuessed()
        );
    }

    public HangmanGameState newGame() {
        hangman.newGame();
        return getGameState();
    }

    public HangmanGameState continueGame() {
        hangman.continueGame();
        return getGameState();
    }

    public Hangman guessLetter(char letterGuessed) {
        System.out.println("Guessing: "+letterGuessed+"...");
        hangman.guessLetter(letterGuessed);
        System.out.println("Guessed!");
        System.out.println("adding to list!");
        // Add the guessed letter to the lettersGuessed list
        hangman.getLettersGuessed().add(letterGuessed);
        System.out.println("Added to list! current list: \n"+hangman.getLettersGuessed());
        return hangman;
    }
}
