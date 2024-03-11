package com.brcg.coolcatgames.feature.userRegistration.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Data
@Component
@Document( collection = "userRegistration")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String id;


    private String firstName;


    private String userName;







    @Column(nullable = false, unique = true, length = 45)
    @Email
    @NaturalId(mutable = true)
    private String email;



    @Column(nullable = false, length = 10)
    private String password;



}