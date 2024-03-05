package com.brcg.coolcatgames.feature.tictactoe.repository;

import java.util.List;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IGameInProgressRepository extends MongoRepository<GameInProgress, String> {

    public GameInProgress findByPlayer1(String player1);
    public GameInProgress findByPlayer2(String player2);
    public List<GameInProgress> findAll();

}