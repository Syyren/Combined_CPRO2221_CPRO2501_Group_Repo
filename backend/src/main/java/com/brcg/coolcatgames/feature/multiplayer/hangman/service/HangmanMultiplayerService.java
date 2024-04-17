package com.brcg.coolcatgames.feature.multiplayer.hangman.service;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HangmanMultiplayerService {


    private final Map<String, Hangman> hangmanGames = new HashMap<>();

    public HangmanGameState getGameState(String roomId) {
        Hangman hangman = hangmanGames.get(roomId);
        if (hangman == null) {
            hangman = new Hangman();
            hangman.newGame();// Create a new game if none exists
            hangmanGames.put(roomId, hangman); // Store the new game in the map
        }
        return new HangmanGameState(
                hangman.getDisplayedWord(),
                hangman.getGuesses(),
                hangman.getTotalScore(),
                hangman.getGameStatus(),
                hangman.getLettersGuessed(),
                hangman.getTurnTaken()
        );
    }

    public HangmanGameState newGame(String roomId) {
        Hangman hangman = hangmanGames.get(roomId);
        hangman.newGame();
        return getGameState(roomId);
    }

    public HangmanGameState continueGame(String roomId) {
        Hangman hangman = hangmanGames.get(roomId);
        if (hangman != null) {
            hangman.continueGame();
        }
        return getGameState(roomId);
    }

    public Hangman guessLetter(String roomId, char letterGuessed, String userId) {
        Hangman hangman = hangmanGames.get(roomId);
        if (hangman != null) {
            hangman.guessLetter(letterGuessed);
            hangman.getLettersGuessed().add(letterGuessed);
            hangman.setTurnTaken(userId);
            hangmanGames.put(roomId, hangman);
        }
        return hangman;
    }

}
