package com.brcg.coolcatgames.feature.tictactoe.repository;

import java.util.List;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGameInProgressRepository extends MongoRepository<GameInProgress, String> {

    public List<GameInProgress> findByPlayer1(String player1);
    public List<GameInProgress> findByPlayer2(String player2);
    public List<GameInProgress> findAll();
}