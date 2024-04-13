package com.brcg.coolcatgames.feature.userRegistration.controller;


import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/players")
@AllArgsConstructor
public class PlayerController {

    private final PlayerService playerService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerPlayer(@RequestBody @Valid Player player) {
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        playerService.register(player);
        return ResponseEntity.ok("Player registered successfully with username: " + player.getUsername());
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.listAll());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDetails> getPlayerByUsername(@PathVariable String username) {
        UserDetails player = playerService.loadUserByUsername(username);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/update/{playerId}")
    public ResponseEntity<String> updatePlayer(@PathVariable String playerId, @RequestBody @Valid Player updatedPlayer) {
        Player updatedPlayerResult = playerService.updatePlayer(playerId, updatedPlayer);
        if (updatedPlayerResult != null) {
            return ResponseEntity.ok("Player with id " + playerId + " updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player with id " + playerId + " not found.");
        }
    }

    @DeleteMapping("/delete/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.ok("Player with id " + playerId + " deleted successfully.");
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable String id) {
        Player player = playerService.getPlayerByID(id);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}