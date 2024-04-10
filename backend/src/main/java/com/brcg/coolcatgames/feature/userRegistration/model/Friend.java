package com.brcg.coolcatgames.feature.userRegistration.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

// Friend entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "friendList")
public class Friend {
    @Id
    private String id;
    private String playerId;
    private String friendId;
    private String status;
    // Getter and setter methods
    @Getter
    private String email;
    @Getter
    private String userName;
    @Getter
    private String firstName;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
