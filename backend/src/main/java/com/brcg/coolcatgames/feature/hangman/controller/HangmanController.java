package com.brcg.coolcatgames.feature.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.hangman.model.HangmanScore;
import com.brcg.coolcatgames.feature.hangman.service.HangmanScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
                hangman.getTotalScore(),
                hangman.getGameStatus()
        );
    }

    @GetMapping("/new-game")
    public ResponseEntity<HangmanGameState> newGame() {
        //reset game
        hangman.newGame();
        //return new game state
        HangmanGameState gameState = new HangmanGameState(
                hangman.getDisplayedWord(),
                hangman.getGuesses(),
                hangman.getTotalScore(),
                hangman.getGameStatus()
        );
        return ResponseEntity.ok(gameState);
    }

    @GetMapping("/continue-game")
    public ResponseEntity<HangmanGameState> continueGame() {
        //reset game, score persists
        hangman.continueGame();
        //return updated game state
        HangmanGameState gameState = new HangmanGameState(
                hangman.getDisplayedWord(),
                hangman.getGuesses(),
                hangman.getTotalScore(),
                hangman.getGameStatus()
        );
        return ResponseEntity.ok(gameState);
    }


    @PostMapping("/guess")
    public ResponseEntity<Hangman> guessLetter(@RequestParam char letterGuessed) {
        hangman.guessLetter(letterGuessed);
        // Return the updated game state in the response body
        return ResponseEntity.ok(hangman);
    }

    @PostMapping("/save-score")
    public ResponseEntity<String> saveScore() {
        hangmanScore.setGameName("hangman");
        hangmanScore.setUserId("Kaden"); //logic later
        hangmanScore.setScore(hangman.getTotalScore());
        hangmanScoreService.saveScore(hangmanScore);
        return ResponseEntity.ok("Score saved successfully");
    }




}
