package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.repository.IGameInProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        if (game.getPlayer2() == null || game.getPlayer2() == "null") {
            game.setPlayer2("CPU");
        }
        if (game.getId().contains("null")) {
            game.setId(game.getPlayer1()+"_"+game.getPlayer2());
        }
        if (game.getLastMoveTime() == null) {
            game.setLastMoveTime(new Date());
        }
        return repository.save(game);
    }

    public List<GameInProgress> getGamesByUserId(String userId) {
        List<GameInProgress> player1List = repository.findByPlayer1(userId);
        List<GameInProgress> player2List = repository.findByPlayer2(userId);
        return Stream.concat(player1List.stream(), player2List.stream()).toList();
    }

    public GameInProgress getGameById(String gameId) {
        return repository.findById(gameId).get();
    }

    public String deleteGameById(String gameId) {
        try {
            repository.deleteById(gameId);

            return "Successfully delete game with Id "+gameId;
        }
        catch (Exception E) {
            return E.toString();
        }
    }

    public GameInProgress updateBoardState(String gameId, String playerId,int position) {
        GameInProgress game = getGameById(gameId);
        if (position >=0 && position <=8) {
            String[] boardState = game.getBoardState();
            if (boardState[position] == null) {
                boardState[position] = playerId;
                game.setBoardState(boardState);
            }
            else {
                throw new IllegalArgumentException();
            }
        } else {
            throw new IllegalArgumentException();
        }
        return repository.save(game);
    }
}
