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
                hangman.getGameStatus()
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
        hangman.guessLetter(letterGuessed);
        return hangman;
    }

    public void saveScore() {
        //save score
    }
}

