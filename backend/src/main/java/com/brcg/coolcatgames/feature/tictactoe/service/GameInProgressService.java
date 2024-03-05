package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.repository.IGameInProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
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

    public GameInProgress updateBoardState(String gameId, String playerId,int position) throws IllegalArgumentException {
        GameInProgress game = getGameById(gameId);
        //System.out.println("Player 1:" +game.getPlayer1() +"\nPlayer 2:" + game.getPlayer2() +"\nActive player:"+ playerId);
        if (Objects.equals(game.getPlayer1(), playerId) || Objects.equals(game.getPlayer2(), playerId)) {
            if (game.getLastPlayerMoved() != playerId) {
                if (position >= 0 && position <= 8) {
                    String[] boardState = game.getBoardState();
                    if (boardState[position] == null) {
                        boardState[position] = playerId;
                        game.setBoardState(boardState);
                    } else {
                        throw new IllegalArgumentException("Position on board must be empty!");
                    }
                } else {
                    throw new IllegalArgumentException("Position must be a value between 0 and 8");
                }
                game.setLastMoveTime(new Date());
                game.setLastPlayerMoved(playerId);
            } else {
                throw new IllegalArgumentException("playerId must not be the same as the last player to move");
            }
        } else {
            throw new IllegalArgumentException("PlayerId must be one of the two players in the game");
        }
        return repository.save(game);
    }

    public String CheckForWinner(String gameId) {
        GameInProgress game = getGameById(gameId);
        String[] boardState = game.getBoardState();
        Boolean gameIsOver = false;
        if (boardState[0] == boardState[3] && boardState[3] == boardState[6]) {
            return boardState[0];
        }
        if (boardState[1] == boardState[4] && boardState[4] == boardState[7]) {
            return boardState[1];
        }
        if (boardState[2] == boardState[5] && boardState[5] == boardState[8]) {
            return boardState[2];
        }
        if (boardState[0] == boardState[1] && boardState[1] == boardState[2]) {
            return boardState[0];
        }
        if (boardState[3] == boardState[4] && boardState[4] == boardState[5]) {
            return boardState[3];
        }
        if (boardState[6] == boardState[7] && boardState[7] == boardState[8]) {
            return boardState[6];
        }
        if (boardState[0] == boardState[5] && boardState[5] == boardState[8]) {
            return boardState[0];
        }
        if (boardState[2] == boardState[5] && boardState[5] == boardState[6]) {
            return boardState[2];
        }
        for (int i = 0; i<9;i++) {
            if(boardState[i] == null) {
                break;
            }
            if (i == 8) {
                return "draw";
            }
        }
        return null;
    }
}
