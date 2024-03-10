package com.brcg.coolcatgames.feature.userRegistration.controller;


import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/players")
public class RegistrationController {

    private final PlayerServices playerServices;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationController(PlayerServices playerServices, PasswordEncoder passwordEncoder) {
        this.playerServices = playerServices;
        this.passwordEncoder = passwordEncoder;
    }


    // register new player
    @PostMapping(value = "/register")
    public ResponseEntity<String> registerPlayer(@RequestBody Player player) {
        // Encode the player's password before saving
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        playerServices.saveorUpdate(player);
        return ResponseEntity.ok("Player registered successfully with username: " + player.getUserName());
    }

    @GetMapping(value = "/getall")
    public ResponseEntity<Iterable<Player>> getPlayers() {
        return ResponseEntity.ok(playerServices.listAll());
    }

    @PutMapping("/update/{playerId}")
    public ResponseEntity<String> updatePlayer(@PathVariable String playerId, @RequestBody Player updatedPlayer) {
        Player updatedPlayerResult = playerServices.updatePlayer(Integer.parseInt(playerId), updatedPlayer);
        if (updatedPlayerResult != null) {
            return ResponseEntity.ok("Player with id " + playerId + " updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player with id " + playerId + " not found.");
        }
    }

    // Delete a player by ID
    @DeleteMapping("/delete/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerId) {
        playerServices.deletePlayer(playerId);
        return ResponseEntity.ok("Player with id " + playerId + " deleted successfully.");
    }

    @GetMapping("/player/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable(name = "id") String playerId) {
        Player player = playerServices.getPlayerByID(playerId);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}