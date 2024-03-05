package com.brcg.coolcatgames.feature.tictactoe.controller;


import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.service.TictactoeStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores/tictactoe")
@CrossOrigin(origins = "http://localhost:3000")
public class TictactoeStatsController {
    @Autowired
    TictactoeStatsService service;


    // Gets a list of scores right now, but since none are saved, it's an empty list
    @GetMapping("/allscores")
    public List<TictactoeStats> getAllGamesInProgress() {
        return service.getAllScores();
    }

    // Save a score
    @PostMapping("/save")
    public Scores saveScore(@RequestBody TictactoeStats tictactoeStats) {
        return service.saveTictactoeStats(tictactoeStats);
    }
}
