package com.brcg.coolcatgames.feature.tictactoe.controller;

import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.service.CombinedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tictactoe")
@CrossOrigin(origins = "http://localhost:3000")
public class combinedController {
    @Autowired
    CombinedService combinedService;

    @GetMapping("/testandconclude")
    List<TictactoeStats> testandconclude(@RequestParam String player1Id,@RequestParam String player2Id) {

        return (combinedService.testAndConcludeGame(player1Id,player2Id));
    }
}
