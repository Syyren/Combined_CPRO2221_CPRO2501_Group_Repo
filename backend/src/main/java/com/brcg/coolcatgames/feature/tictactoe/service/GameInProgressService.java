package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.repository.IGameInProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class GameInProgressService {
    @Autowired
    IGameInProgressRepository repository;

    public List<GameInProgress> getAllGamesInProgress() {
        return repository.findAll();
    }

    public GameInProgress saveGameInProgress(GameInProgress game) {
            return repository.save(game);
    }

    public List<GameInProgress> getGamesByUserId(String userId) {
        List<GameInProgress> player1List = repository.findByPlayer1(userId);
        List<GameInProgress> player2List = repository.findByPlayer2(userId);
        return Stream.concat(player1List.stream(), player2List.stream()).toList();
    }

    public Optional<GameInProgress> getGameById(String gameId) {
        return repository.findById(gameId);
    }
}
