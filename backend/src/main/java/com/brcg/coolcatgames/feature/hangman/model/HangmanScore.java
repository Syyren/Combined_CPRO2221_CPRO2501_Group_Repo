package com.brcg.coolcatgames.feature.hangman.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Data
@Component
//@EqualsAndHashCode(callSuper = true)
@Document(collection = "Scores")
public class HangmanScore {//extends Scores {
    private int score;
    private String gameName;
    private String userId;
    private String leaderboard;

    // Constructor
    public HangmanScore() {
        this.score = 0;
    }

    // Method to update score
    public void updateScore(int points) {
        this.score += points;
    }

    // Method to reset score
    public void resetScore() {
        this.score = 0;
    }
}
