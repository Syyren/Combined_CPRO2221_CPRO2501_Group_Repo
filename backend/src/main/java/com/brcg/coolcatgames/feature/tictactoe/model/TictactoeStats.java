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
// TODO: Make implement IScore or extend abstract Score from Bergen's Leaderboard feature branch
public class TictactoeStats {
    // Game for Interface
    private String game = "TicTacToe";
    // User Id for Interface
    @Id
    private String userId;
    private int gamesWon;
    private int gamesLost;
    private int gamesDrawn;
    // Score for Interface, implementing an Elo score
    private int score;
    // Interface variable
    private String leaderboardType = "Elo";
}
