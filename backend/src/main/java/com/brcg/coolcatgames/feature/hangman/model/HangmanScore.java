package com.brcg.coolcatgames.feature.hangman.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Data
@Component
//@EqualsAndHashCode(callSuper = true)
@Document(collection = "scores")
public class HangmanScore {//extends Scores {
    private String userId;
    private int score;
    private String gameName;
    private String leaderboard;

    public HangmanScore() {
        this.score = 0;
    }

    public void updateScore(int points) {
        this.score += points;
    }

    public void resetScore() {
        this.score = 0;
    }
}
