package com.brcg.coolcatgames.feature.userRegistration.controller;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/players")
public class RegistrationController {

    @Autowired
    private PlayerServices playerServices;


    // register new player
    @PostMapping(value = "/save")
    public String savePlayer(@RequestBody Player players) {
        playerServices.saveorUpdate(players);
        return players.getUserName();
    }

    @GetMapping(value = "/getall")
    public Iterable<Player> getPlayers() {
        return playerServices.listAll();
    }

    @PutMapping("/update/{playerId}")
    public ResponseEntity<String> updatePlayer(@PathVariable int playerId, @RequestBody Player updatedPlayer) {
        Player updatedPlayerResult = playerServices.updatePlayer(playerId, updatedPlayer);

        if (updatedPlayerResult != null) {
            // Player updated successfully
            String successMessage = "Player with id " + playerId + " updated successfully.";
            return ResponseEntity.ok(successMessage);
        } else {
            // Player not found
            String errorMessage = "Player with id " + playerId + " not found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }


    }

    // Delete a player by ID
    @DeleteMapping("/delete/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerId) {
        playerServices.deletePlayer(playerId);
        String successMessage = "Player with id " + playerId + " deleted successfully.";
        return ResponseEntity.ok(successMessage);
    }

    @RequestMapping("/player/{id}")
    private Player getPlayers(@PathVariable(name = "id") String playerid) {
        return playerServices.getPlayerByID(playerid);

    }


}
