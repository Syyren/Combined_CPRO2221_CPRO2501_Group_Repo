package com.brcg.coolcatgames.feature.leaderboard.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Abstract class representing scores in different games.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "scores")
// *Important Note* This only has data validation if you use the save endpoint in ScoreEntityController
public abstract class Scores {

    @Id
    private String id;

    // If manually entering test data please set the gameName to "test" for easier data cleaning
    private String gameName;

    private String userId;

    private int score;

    // Use either the values "Score" or "Elo"
    private String leaderboard;
}