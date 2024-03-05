package com.brcg.coolcatgames.feature.leaderboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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