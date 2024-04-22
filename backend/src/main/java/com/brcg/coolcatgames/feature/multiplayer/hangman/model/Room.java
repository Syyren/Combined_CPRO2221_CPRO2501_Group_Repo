package com.brcg.coolcatgames.feature.multiplayer.hangman.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    private String roomId;
    private String user1;
    private String user2;
}
