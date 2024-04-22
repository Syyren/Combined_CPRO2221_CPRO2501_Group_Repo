package com.brcg.coolcatgames.feature.userRegistration.model;


import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;

/**
 * Model class representing a player.
 */
@Data
@Document(collection = "players")
public class Player {
    @Id
    private String id;

    @NotBlank
    @Size(max = 100)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String username;

    @Email
    @NotBlank
    @Size(max = 45)
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @Getter
    @NotBlank
    @Size(max = 100)
    private String securityQuestion;

    @Getter
    @NotBlank
    @Size(max = 100)
    private String securityAnswer;

    private ArrayList<Integer> achievements;

    // List of Friends ids
    private ArrayList<String> friends;

    public void setSecurityQuestion(String securityQuestion) {
        this.securityQuestion = securityQuestion;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }
}
