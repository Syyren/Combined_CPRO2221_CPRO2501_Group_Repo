package com.brcg.coolcatgames.feature.leaderboard.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores")
public class ScoreEntryController {
    @Autowired
    private ScoreEntryService service;

    // Gets all Scores in the DB
    @GetMapping("/allscores")
    public List<ScoreEntry> getAllScores() {
        return service.getAllScores();
    }

    // Gets all Scores for a specific Game
    @GetMapping("/game/{gameName}")
    public List<ScoreEntry> getScoresByGame(@PathVariable String gameName) {
        return service.getScoresByGame(gameName);
    }

    // Gets all Scores for a specific User
    @GetMapping("/user/{userId}")
    public List<ScoreEntry> getScoresByUser(@PathVariable String userId) {
        return service.getScoresByUser(userId);
    }

    // Gets all Scores for a specific User AND Game
    @GetMapping("/user/{userId}/game/{gameName}")
    public List<ScoreEntry> getScoresByUserAndGame(@PathVariable String userId, @PathVariable String gameName) {
        return service.getScoresByUserAndGame(userId, gameName);
    }

    // Posts a Score
    @PostMapping("/save")
    public ResponseEntity<ScoreEntry> submitScore(@RequestBody ScoreEntry scoreEntry) {
        ScoreEntry savedEntry = service.submitScore(scoreEntry);
        return ResponseEntity.ok(savedEntry);
    }
}