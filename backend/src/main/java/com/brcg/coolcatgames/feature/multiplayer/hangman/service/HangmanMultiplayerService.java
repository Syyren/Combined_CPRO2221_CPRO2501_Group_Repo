package com.brcg.coolcatgames.feature.multiplayer.hangman.service;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.multiplayer.hangman.model.Room;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class HangmanMultiplayerService {


    private final Map<String, Room> rooms = new HashMap<>();
    private final Map<String, Hangman> hangmanGames = new HashMap<>();

    public HangmanGameState getGameState(String roomId) {
        Hangman hangman = hangmanGames.get(roomId);
        if (hangman == null) {
            hangman = new Hangman();
            hangman.newGame();
            hangmanGames.put(roomId, hangman);
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
    public void addUser(String roomId, String userId) {
        Room room = rooms.get(roomId);
        if (room == null) {
            room = new Room(roomId, userId, null);
        } else if (room.getUser2() == null && !Objects.equals(room.getUser1(), userId)) {
            room.setUser2(userId);
        }
        rooms.put(roomId, room);
    }
    public Room getRoomById(String roomId) {
        return rooms.get(roomId);
    }

}
