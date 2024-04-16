package com.brcg.coolcatgames.feature.multiplayer.room.service;

import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;

import java.util.HashMap;
import java.util.Map;

public class RoomService {
    private Map<String, HangmanGameState> roomStates;

    public RoomService() {
        this.roomStates = new HashMap<>();
    }

    public void createRoom(String roomId) {
        roomStates.put(roomId, new HangmanGameState());
    }

    public HangmanGameState getRoomState(String roomId) {
        return roomStates.get(roomId);
    }

    public void updateRoomState(String roomId, HangmanGameState gameState) {
        roomStates.put(roomId, gameState);
    }

    // Other methods for managing rooms
}
