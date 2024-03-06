package com.brcg.coolcatgames.feature.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.hangman.model.HangmanScore;
import com.brcg.coolcatgames.feature.hangman.service.HangmanScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hangman")
public class HangmanController {
    private final Hangman hangman = new Hangman();
    private final HangmanScore hangmanScore = new HangmanScore();
    private final HangmanScoreService hangmanScoreService;

    @Autowired
    public HangmanController(HangmanScoreService hangmanScoreService) {
        this.hangmanScoreService = hangmanScoreService;
    }
    @GetMapping("/gamestate")
    public HangmanGameState getGameState() {
        return new HangmanGameState(
                hangman.getDisplayedWord(),
                hangman.getGuesses(),
                hangman.getTotalScore()
        );
    }

    @PostMapping("/guess")
    public ResponseEntity<String> guessLetter(@RequestParam char letterGuessed) {
        hangman.guessLetter(letterGuessed);
        return ResponseEntity.ok("Guess successful");
    }

    @GetMapping("/score")
    public int getTotalScore() {
        return hangman.getTotalScore();
    }

    @PostMapping("/save-score")
    public ResponseEntity<String> saveScore() {
        hangmanScore.setGameName("hangman");
        hangmanScore.setUserId("Kaden"); //logic later
        hangmanScore.setScore(hangmanScore.getScore());
        hangmanScoreService.saveScore(hangmanScore);
        return ResponseEntity.ok("Score saved successfully");
    }

}
