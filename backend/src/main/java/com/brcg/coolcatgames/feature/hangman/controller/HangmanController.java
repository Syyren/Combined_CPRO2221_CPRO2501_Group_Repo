package com.brcg.coolcatgames.feature.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.hangman.service.HangmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/hangman")
public class HangmanController {

    private final HangmanService hangmanService;

    @Autowired
    public HangmanController(HangmanService hangmanService) {
        this.hangmanService = hangmanService;
    }

    @GetMapping("/gamestate")
    public HangmanGameState getGameState() {
        return hangmanService.getGameState();
    }

    @GetMapping("/new-game")
    public ResponseEntity<HangmanGameState> newGame() {
        HangmanGameState gameState = hangmanService.newGame();
        return ResponseEntity.ok(gameState);
    }

    @GetMapping("/continue-game")
    public ResponseEntity<HangmanGameState> continueGame() {
        HangmanGameState gameState = hangmanService.continueGame();
        return ResponseEntity.ok(gameState);
    }

    @PostMapping("/guess")
    public ResponseEntity<Hangman> guessLetter(@RequestParam char letterGuessed) {
        Hangman updatedHangman = hangmanService.guessLetter(letterGuessed);
        return ResponseEntity.ok(updatedHangman);
    }

}
