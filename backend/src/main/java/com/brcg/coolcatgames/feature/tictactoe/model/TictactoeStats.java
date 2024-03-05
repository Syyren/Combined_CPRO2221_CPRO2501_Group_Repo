package com.brcg.coolcatgames.feature.tictactoe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TictactoeStats {
    @Id
    private String userId;
    private int gamesWon;
    private int gamesLost;
    private int gamesDrawn;
}
