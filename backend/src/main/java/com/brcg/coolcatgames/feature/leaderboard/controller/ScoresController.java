package com.brcg.coolcatgames.feature.leaderboard.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class ScoresController {
    @Autowired
    ScoresService service;

    @GetMapping("/all")
    public List<ScoreEntry> getAllScores() {
        return service.getAllScores();
    }
}
