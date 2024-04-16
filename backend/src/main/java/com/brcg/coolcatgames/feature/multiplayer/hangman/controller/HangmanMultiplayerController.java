package com.brcg.coolcatgames.feature.multiplayer.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.multiplayer.hangman.service.HangmanMultiplayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/hangman")
public class HangmanMultiplayerController {

    private final HangmanMultiplayerService hangmanMultiplayerService;

    @Autowired
    public HangmanMultiplayerController(HangmanMultiplayerService hangmanMultiplayerService) {
        this.hangmanMultiplayerService = hangmanMultiplayerService;
    }

    @GetMapping("/{roomId}/gamestate")
    public HangmanGameState getGameState(@PathVariable String roomId) {
        return hangmanMultiplayerService.getGameState(roomId);
    }

    @GetMapping("/{roomId}/new-game")
    public ResponseEntity<HangmanGameState> newGame(@PathVariable String roomId) {
        HangmanGameState gameState = hangmanMultiplayerService.newGame(roomId);
        return ResponseEntity.ok(gameState);
    }

    @GetMapping("/{roomId}/continue-game")
    public ResponseEntity<HangmanGameState> continueGame(@PathVariable String roomId) {
        HangmanGameState gameState = hangmanMultiplayerService.continueGame(roomId);
        return ResponseEntity.ok(gameState);
    }

    @PostMapping("/{roomId}/guess")
    public ResponseEntity<Hangman> guessLetter(@PathVariable String roomId, @RequestParam char letterGuessed) {
        Hangman updatedHangman = hangmanMultiplayerService.guessLetter(roomId, letterGuessed);
        return ResponseEntity.ok(updatedHangman);
    }

}
