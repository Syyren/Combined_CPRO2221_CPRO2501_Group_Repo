package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.repository.ITictactoeStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TictactoeStatsService {
    public enum gameConclusion {
        WINNER, LOSER, DRAW
    }
    @Autowired
    ITictactoeStatsRepository repository;

    public List<TictactoeStats> getAllScores() {
        return repository.findAllTictactoeStats();
    }

    public List<TictactoeStats> getScoresByUserId(String userId) {
        return getAllScores().stream().filter(score -> score.getUserId().equals(userId)).toList();
    }

    public Scores saveTictactoeStats(TictactoeStats tictactoeStats) {
        tictactoeStats.setGameName("tictactoe");
        tictactoeStats.setLeaderboard("elo");
        return repository.save(tictactoeStats);
    }

    public String deleteTictactoeStats(String id) {
        repository.deleteById(id);
        return "entry with id "+id+" deleted";
    }

    public TictactoeStats updateScore(String userId, int deltaScore, gameConclusion conclusion) {
        // Because userId comes from the parent class and isn't native to TictactoeStats,
        // I can't easily search by userId in the ITictactoeStatsRepository
        // without more research into how @Query works
        List<TictactoeStats> allUserScores = getAllScores();
        for (TictactoeStats userScore: allUserScores) {
            if(userId.equals( userScore.getUserId())) {

                int oldScore = userScore.getScore();
                userScore.setScore(oldScore+deltaScore);
                if (conclusion == gameConclusion.DRAW) {
                    userScore.setGamesDrawn(userScore.getGamesDrawn()+1);
                } else if (conclusion == gameConclusion.WINNER) {
                    userScore.setGamesWon(userScore.getGamesWon()+1);
                } else if (conclusion == gameConclusion.LOSER) {
                    userScore.setGamesLost(userScore.getGamesLost()+1);
                }
                return repository.save(userScore);
            }
        }
        TictactoeStats newScore = new TictactoeStats();
        newScore.setScore(1000);
        newScore.setUserId(userId);
        saveTictactoeStats(newScore);
        return updateScore(userId,deltaScore,conclusion);
    }
}
