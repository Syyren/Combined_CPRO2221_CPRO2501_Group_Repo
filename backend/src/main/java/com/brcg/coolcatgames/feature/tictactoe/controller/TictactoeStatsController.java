package com.brcg.coolcatgames.feature.tictactoe.controller;


import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.service.TictactoeStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/scores/tictactoe")
@CrossOrigin(origins = "http://localhost:3000")
public class TictactoeStatsController {
    @Autowired
    TictactoeStatsService service;


    @GetMapping("/allscores")
    public List<TictactoeStats> getAllGamesInProgress() {
        return service.getAllScores();
    }
}
