package com.brcg.coolcatgames.feature.tictactoe.model;

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
// TODO: Make implement IScore or extend abstract Score from Bergen's Leaderboard feature branch
public class TictactoeStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Game for Interface
    private String gameName = "TicTacToe";
    // User Id for Interface
    private String userId;
    private int gamesWon;
    private int gamesLost;
    private int gamesDrawn;
    // Score for Interface, implementing an Elo score
    private int score;
    // Interface variable
    private String leaderboard = "Elo";
}
