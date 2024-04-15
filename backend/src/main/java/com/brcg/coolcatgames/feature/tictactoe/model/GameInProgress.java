package com.brcg.coolcatgames.feature.tictactoe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameInProgress {
    private String player1;
    private String player2;
    @Id
    private String id = player1 + "_" + player2;
    private String[] boardState ={null,null,null,null,null,null,null,null,null};
    private Date lastMoveTime;
    private String lastPlayerMoved;
}
