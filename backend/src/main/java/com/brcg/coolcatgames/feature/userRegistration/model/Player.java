package com.brcg.coolcatgames.feature.userRegistration.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;

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

    private ArrayList<Integer> achievements;

    private int imageID;
}
