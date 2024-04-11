package com.brcg.coolcatgames.feature.arcadeShooter.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "canineinvaders_gamesessions")
public class ArcadeShooterSession {

    @Id
    private String id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String userId;
    private int finalScore;
    private int levelReached;
}