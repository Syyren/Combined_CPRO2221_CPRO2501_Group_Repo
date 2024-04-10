package com.brcg.coolcatgames.feature.userRegistration.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "userRegistration")
public class Player {

    @Id
    private String id;

    private String firstName;
    private String userName;
    private String email;
    private String password;

    // Constructors, getters, setters, etc.
}


