package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.repository.IGameInProgressRepository;
import com.brcg.coolcatgames.feature.tictactoe.repository.ITictactoeStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CombinedService {

    @Autowired
    IGameInProgressRepository gameRepository;
    @Autowired
    ITictactoeStatsRepository scoreRepository;

    @Autowired
    GameInProgressService gameService;
    @Autowired
    TictactoeStatsService scoreService;

    public List<TictactoeStats> testAndConcludeGame(String userId1, String userId2) {
        List<GameInProgress> gamesUser1 = Stream.concat( gameRepository.findByPlayer1(userId1).stream(),gameRepository.findByPlayer2(userId1).stream()).distinct().toList();
        List<GameInProgress> gamesUser2 = Stream.concat( gameRepository.findByPlayer1(userId2).stream(),gameRepository.findByPlayer2(userId2).stream()).distinct().toList();
        List<GameInProgress> gamesListFinal = gamesUser2.stream().filter(gamesUser1::contains).collect(Collectors.toList());
        GameInProgress game = gamesListFinal.getFirst();
        String gameIsOver = gameService.checkForWinner(game.getId());
        if (gameIsOver != null) {
            TictactoeStats user1Score = scoreService.getScoresByUserId(userId1).getFirst();
            if (user1Score == null) {
                TictactoeStats newScore = new TictactoeStats();
                newScore.setUserId(userId1);
                newScore.setScore(1000);
                scoreService.saveTictactoeStats(newScore);
            }
            TictactoeStats user2Score = scoreService.getScoresByUserId(userId2).getFirst();
            if (user2Score == null) {
                TictactoeStats newScore = new TictactoeStats();
                newScore.setUserId(userId2);
                newScore.setScore(1000);
                scoreService.saveTictactoeStats(newScore);
            }
            List<TictactoeStats> statsToReturn = new ArrayList<TictactoeStats>();
            if (gameIsOver.equals("draw")) {
                statsToReturn.add( scoreService.updateScore(userId1,0, TictactoeStatsService.gameConclusion.DRAW));
                statsToReturn.add( scoreService.updateScore(userId2,0, TictactoeStatsService.gameConclusion.DRAW));
                gameService.deleteGameById(game.getId());
                return statsToReturn;
            } else if (gameIsOver.equals(userId1)) {
                int user1Elo = user1Score.getScore();
                int user2Elo = user2Score.getScore();
                int averageElo = (user2Elo+user1Elo)/2;
                int user1DeltaScore = (averageElo+user2Elo+400)/200;
                int user2DeltaScore = -((averageElo+ user1Elo-400)/200);
                statsToReturn.add( scoreService.updateScore(userId1,user1DeltaScore, TictactoeStatsService.gameConclusion.WINNER));
                statsToReturn.add(  scoreService.updateScore(userId2,user2DeltaScore, TictactoeStatsService.gameConclusion.LOSER));
                gameService.deleteGameById(game.getId());
                return statsToReturn;
            } else if (gameIsOver.equals(userId2)) {

                int user1Elo = user1Score.getScore();
                int user2Elo = user2Score.getScore();
                int averageElo = (user2Elo+user1Elo)/2;
                int user1DeltaScore = -((averageElo+ user2Elo-400)/200);
                int user2DeltaScore = (averageElo+ user1Elo+400)/200;
                statsToReturn.add( scoreService.updateScore(userId1,user1DeltaScore, TictactoeStatsService.gameConclusion.LOSER));
                statsToReturn.add(  scoreService.updateScore(userId2,user2DeltaScore, TictactoeStatsService.gameConclusion.WINNER));
                gameService.deleteGameById(game.getId());
                return statsToReturn;
            }
        }

        return null;
    }
}
