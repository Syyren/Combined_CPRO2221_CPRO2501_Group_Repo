package com.brcg.coolcatgames.feature.leaderboard.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/scores")
public class ScoreEntryController {
    @Autowired
    ScoreEntryService service;

    // Retrieves
    @GetMapping("/allscores")
    public List<ScoreEntry> getAllScores() {
        return service.getAllScores();
    }
}
