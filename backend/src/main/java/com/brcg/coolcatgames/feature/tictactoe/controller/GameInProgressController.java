package com.brcg.coolcatgames.feature.tictactoe.controller;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.service.GameInProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tictactoe")
@CrossOrigin(origins = "http://localhost:3000")
public class GameInProgressController {
    @Autowired
    GameInProgressService service;

    @GetMapping("/allgames")
    public List<GameInProgress> getAllGamesInProgress() {
        return service.getAllGamesInProgress();
    }

    @GetMapping("/games/{userId}")
    public List<GameInProgress> getUsersGamesInProgress(@PathVariable String userId) {
        return service.getGamesByUserId(userId);
    }

    @PostMapping("/save")
    public GameInProgress saveGameInProgress(@RequestBody GameInProgress gameInProgress) {
        return service.saveGameInProgress(gameInProgress);
    }

    @GetMapping("/game/{gameId}")
    public GameInProgress getGameById(@PathVariable String gameId) {
        return service.getGameById(gameId);
    }

    @DeleteMapping("/delete/{gameId}")
    public String deleteGameById(@PathVariable String gameId) {
        return service.deleteGameById(gameId);
    }

    @PutMapping("/update/{gameId}")
    public GameInProgress updateBoardState(@PathVariable String gameId,@RequestParam String playerId,@RequestParam int position) {
        return service.updateBoardState(gameId,playerId,position);
    }

    @GetMapping("/checkWinner/{gameId}")
    public String checkForWinner(@PathVariable String gameId) {
        return service.checkForWinner(gameId);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String handleException(Exception E) {
        return E.getMessage();
    }
}
