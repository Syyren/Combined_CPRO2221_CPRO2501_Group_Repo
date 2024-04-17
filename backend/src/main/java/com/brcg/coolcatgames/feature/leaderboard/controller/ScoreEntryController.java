package com.brcg.coolcatgames.feature.leaderboard.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for managing score entries.
 */
@RestController
@RequestMapping("/scores")
public class ScoreEntryController {
    @Autowired
    private ScoreEntryService service;

    /**
     * Retrieves all scores in the database.
     *
     * @return a list of all scores
     */
    @GetMapping("/allscores")
    public List<ScoreEntry> getAllScores() {
        return service.getAllScores();
    }

    /**
     * Retrieves all scores for a specific game.
     *
     * @param gameName the name of the game
     * @return a list of scores for the specified game
     */
    @GetMapping("/game/{gameName}")
    public List<ScoreEntry> getScoresByGame(@PathVariable String gameName) {
        return service.getScoresByGame(gameName);
    }

    /**
     * Retrieves all scores for a specific user.
     *
     * @param userId the ID of the user
     * @return a list of scores for the specified user
     */
    @GetMapping("/user/{userId}")
    public List<ScoreEntry> getScoresByUser(@PathVariable String userId) {
        return service.getScoresByUser(userId);
    }

    /**
     * Retrieves all scores for a specific user and game.
     *
     * @param userId   the ID of the user
     * @param gameName the name of the game
     * @return a list of scores for the specified user and game
     */
    @GetMapping("/user/{userId}/game/{gameName}")
    public List<ScoreEntry> getScoresByUserAndGame(@PathVariable String userId, @PathVariable String gameName) {
        return service.getScoresByUserAndGame(userId, gameName);
    }

    /**
     * Submits a score.
     *
     * @param scoreEntry the score entry to submit
     * @return the saved score entry
     */
    @PostMapping("/save")
    public ResponseEntity<ScoreEntry> submitScore(@RequestBody ScoreEntry scoreEntry) {
        ScoreEntry savedEntry = service.submitScore(scoreEntry);
        return ResponseEntity.ok(savedEntry);
    }
}
