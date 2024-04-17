package com.brcg.coolcatgames.feature.multiplayer.room.model;

import java.util.ArrayList;
import java.util.List;

public class Room {
    private final List<String> users = new ArrayList<>();
    private final int maxUsers = 2;

    public void addUser(String user) {
        if (users.size() < maxUsers) {
            users.add(user);
        }
    }

    public void removeUser(String user) {
        users.remove(user);
    }

    public boolean isFull() {
        return users.size() >= maxUsers;
    }
}
