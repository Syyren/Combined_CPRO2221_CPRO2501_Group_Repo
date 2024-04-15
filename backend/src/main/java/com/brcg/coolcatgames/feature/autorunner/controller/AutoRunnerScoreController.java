package com.brcg.coolcatgames.feature.autorunner.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autorunner")
public class AutoRunnerScoreController
{
    @Autowired
    private ScoreEntryService scoreService;

    //saves an autorunner game's score
    @PostMapping("/save-score/{userId}/{scoreAmt}")
    public ResponseEntity<?> submitScore(@PathVariable String userId, @PathVariable int scoreAmt)
    {
        try
        {
            ScoreEntry scoreEntry = new ScoreEntry();
            scoreEntry.setGameName("cat-run");
            scoreEntry.setUserId(userId);
            scoreEntry.setScore(scoreAmt);
            scoreEntry.setLeaderboard("Score");
            ScoreEntry savedEntry = scoreService.submitScore(scoreEntry);
            return ResponseEntity.ok(savedEntry);
        }
        catch (Error e)
        {
            return ResponseEntity.internalServerError().body("Could not save score: " + e.getMessage());
        }
    }
}