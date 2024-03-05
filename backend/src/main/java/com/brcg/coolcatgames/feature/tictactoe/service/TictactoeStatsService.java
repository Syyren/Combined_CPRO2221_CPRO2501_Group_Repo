package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.repository.ITictactoeStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TictactoeStatsService {
    @Autowired
    ITictactoeStatsRepository repository;

    public List<TictactoeStats> getAllScores() {
        return repository.findAll();
    }

    public Scores saveTictactoeStats(TictactoeStats tictactoeStats) {
        tictactoeStats.setGameName("tictactoe");
        return repository.save(tictactoeStats);
    }

}
