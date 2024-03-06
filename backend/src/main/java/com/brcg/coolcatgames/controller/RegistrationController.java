package com.brcg.coolcatgames.controller;

import com.brcg.coolcatgames.model.Player;
import com.brcg.coolcatgames.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/players")
public class RegistrationController {

    @Autowired
    private PlayerRepository playerRepository;





    // register new player
    @PostMapping("/register")
    public String registerPlayer(@RequestBody Player player) {
        // Check if the username is already taken
        if (playerRepository.findByUserName(player.getUserName()) != null) {
            return "Username already exists";
        }


        playerRepository.save(player);
        return "Player registered successfully";
    }

    @GetMapping("/all")
    public ResponseEntity<List<Player>> getAllPlayers(){
        List<Player> allPlayers= playerRepository.getAllPlayers();
        return ResponseEntity.ok(allPlayers);
    }
}
