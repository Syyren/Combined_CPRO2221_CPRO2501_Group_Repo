package com.brcg.coolcatgames.feature.multiplayer.room.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class RoomService {

    private final Map<String, Set<String>> roomUsers = new HashMap<>();

    public void addUserToRoom(String roomId, String userId) {
        Set<String> users = roomUsers.getOrDefault(roomId, new HashSet<>());
        users.add(userId);
        roomUsers.put(roomId, users);
    }

    public void removeUserFromRoom(String roomId, String userId) {
        Set<String> users = roomUsers.getOrDefault(roomId, new HashSet<>());
        users.remove(userId);
        roomUsers.put(roomId, users);
    }

    public Set<String> getUsersInRoom(String roomId) {
        return roomUsers.getOrDefault(roomId, new HashSet<>());
    }
}
