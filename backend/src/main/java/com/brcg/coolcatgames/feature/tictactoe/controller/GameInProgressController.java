package com.brcg.coolcatgames.feature.tictactoe.controller;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.service.GameInProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/tictactoe")
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
}
