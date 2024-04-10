package com.brcg.coolcatgames.feature.userRegistration.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendDTO {
    private String playerId;
    private String friendId;
    private String status;
    private String email;
    private String userName;
    private String firstName;

    // Constructor for a message
    public FriendDTO(String message) {
        this.userName = message; // Set the message to userName for example
    }
}
