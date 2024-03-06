package com.brcg.coolcatgames.feature.leaderboard.model;

import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
@Data
@Document(collection = "Scores")
@TypeAlias("Scores")
public class ScoreEntry extends Scores{

}
