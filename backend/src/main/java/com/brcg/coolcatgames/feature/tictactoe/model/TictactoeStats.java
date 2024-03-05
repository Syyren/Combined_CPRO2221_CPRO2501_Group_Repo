package com.brcg.coolcatgames.feature.tictactoe.model;


import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
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
public class TictactoeStats extends Scores {
    private int gamesWon;
    private int gamesLost;
    private int gamesDrawn;
}
