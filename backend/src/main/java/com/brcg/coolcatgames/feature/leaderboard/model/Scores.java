package com.brcg.coolcatgames.feature.leaderboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Scores")
public abstract class Scores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    // If manually entering test data please set the gameName to "test" for easier data cleaning
    private String gameName;
    private String userId;
    private int score;
    private String leaderboard;
}