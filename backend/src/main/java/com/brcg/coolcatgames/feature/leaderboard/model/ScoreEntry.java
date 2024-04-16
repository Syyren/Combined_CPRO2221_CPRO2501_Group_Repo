package com.brcg.coolcatgames.feature.leaderboard.model;

import lombok.Data;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a score entry in the leaderboard.
 */
@Data
@Document(collection = "scores")
@TypeAlias("Scores")
public class ScoreEntry extends Scores {

}
