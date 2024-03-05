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
            if (!Objects.equals(game.getLastPlayerMoved(), playerId)) {
                if (position >= 0 && position <= 8) {
                    String[] boardState = game.getBoardState();
                    if (boardState[position] == null) {
                        boardState[position] = playerId;
                        game.setBoardState(boardState);
                    } else {
                        throw new IllegalArgumentException("Position on board must be empty! This position is already occupied by "+boardState[position]);
                    }
                } else {
                    throw new IllegalArgumentException("Position must be a value between 0 and 8, you gave "+position);
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

    public String checkForWinner(String gameId) {
        GameInProgress game = getGameById(gameId);
        String[] boardState = game.getBoardState();
        if (Objects.equals(boardState[0], boardState[3]) && Objects.equals(boardState[3], boardState[6]) && boardState[0] != null) {
            //System.out.println("Game won on column 1\nPlayer: "+boardState[0]);
            return boardState[0];
        }
        if (Objects.equals(boardState[1], boardState[4]) && Objects.equals(boardState[4], boardState[7]) && boardState[1] != null) {
            //System.out.println("Game won on column 2\nPlayer: "+boardState[1]);
            return boardState[1];
        }
        if (Objects.equals(boardState[2], boardState[5]) && Objects.equals(boardState[5], boardState[8]) && boardState[2] != null) {
            //System.out.println("Game won on column 3\nPlayer: "+boardState[2]);
            return boardState[2];
        }
        if (Objects.equals(boardState[0], boardState[1]) && Objects.equals(boardState[1], boardState[2]) && boardState[0] != null) {
            //System.out.println("Game won on row 1\nPlayer: "+boardState[0]);
            return boardState[0];
        }
        if (Objects.equals(boardState[3], boardState[4]) && Objects.equals(boardState[4], boardState[5]) && boardState[3] != null) {
            //System.out.println("Game won on row 2\nPlayer: "+boardState[3]);
            return boardState[3];
        }
        if (Objects.equals(boardState[6], boardState[7]) && Objects.equals(boardState[7], boardState[8]) && boardState[6] != null) {
            //System.out.println("Game won on row 3\nPlayer: "+boardState[6]);
            return boardState[6];
        }
        if (Objects.equals(boardState[0], boardState[5]) && Objects.equals(boardState[5], boardState[8]) && boardState[0] != null) {
            //System.out.println("Game won on negative diagonal\nPlayer: "+boardState[0]);
            return boardState[0];
        }
        if (Objects.equals(boardState[2], boardState[5]) && Objects.equals(boardState[5], boardState[6]) && boardState[2] != null) {
            //System.out.println("Game won on positive diagonal\nPlayer: "+boardState[2]);
            return boardState[2];
        }
        for (int i = 0; i<boardState.length;i++) {
            //System.out.println("i: "+i+"\nPlayer in boardstate: "+boardState[i]);
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
