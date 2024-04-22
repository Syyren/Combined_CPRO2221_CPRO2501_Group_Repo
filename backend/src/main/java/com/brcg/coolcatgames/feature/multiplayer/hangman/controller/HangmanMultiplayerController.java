package com.brcg.coolcatgames.feature.multiplayer.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.multiplayer.hangman.model.Room;
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
    public ResponseEntity<Hangman> guessLetter(@PathVariable String roomId, @RequestParam char letterGuessed, @RequestParam String userId) {
        Hangman updatedHangman = hangmanMultiplayerService.guessLetter(roomId, letterGuessed, userId);
        return ResponseEntity.ok(updatedHangman);
    }

    @PostMapping("/{roomId}/add-user-to-room")
    public void addUser(@PathVariable String roomId, @RequestParam String userId) {
        hangmanMultiplayerService.addUser(roomId, userId);
    }
    @GetMapping("/{roomId}/get-room")
    public ResponseEntity<Room> getRoomById(@PathVariable String roomId) {
        Room room = hangmanMultiplayerService.getRoomById(roomId);
        if (room != null) {
            return ResponseEntity.ok(room);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
