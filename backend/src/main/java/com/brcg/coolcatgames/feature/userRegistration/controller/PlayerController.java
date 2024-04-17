package com.brcg.coolcatgames.feature.userRegistration.controller;


import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for managing player registration and related operations.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/players")
@AllArgsConstructor
public class PlayerController {

    private final PlayerService playerService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Registers a new player.
     *
     * @param player the player to register
     * @return ResponseEntity indicating the success of the registration
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerPlayer(@RequestBody @Valid Player player) {
        // Check if the username is already in use
        if (playerService.usernameExists(player.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already in use. Please choose another username.");
        }

        // Encode the password and register the player
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        playerService.register(player);

        return ResponseEntity.ok("Player registered successfully with username: " + player.getUsername());
    }

    /**
     * Retrieves all players.
     *
     * @return ResponseEntity containing a list of all players
     */
    @GetMapping("/get/all")
    public ResponseEntity<Iterable<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.listAll());
    }

    /**
     * Retrieves a player by username.
     *
     * @param username the username of the player
     * @return ResponseEntity containing the player details
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<UserDetails> getPlayerByUsername(@PathVariable String username) {
        UserDetails player = playerService.loadUserByUsername(username);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Updates a player's information.
     *
     * @param playerId      the ID of the player to update
     * @param updatedPlayer the updated player information
     * @return ResponseEntity indicating the success of the update operation
     */
    @PutMapping("/update/{playerId}")
    public ResponseEntity<String> updatePlayer(@PathVariable String playerId, @RequestBody @Valid Player updatedPlayer) {
        Player updatedPlayerResult = playerService.updatePlayer(playerId, updatedPlayer);
        if (updatedPlayerResult != null) {
            return ResponseEntity.ok("Player with id " + playerId + " updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player with id " + playerId + " not found.");
        }
    }

    /**
     * Gives an achievement to a player.
     *
     * @param playerId       the ID of the player
     * @param achievementId  the ID of the achievement to give
     * @return ResponseEntity indicating the success of the operation
     */
    @PutMapping("/give-achievement/{playerId}/{achievementId}")
    public ResponseEntity<String> giveAchievement(@PathVariable String playerId, @PathVariable int achievementId) {
        try {
            Player updatedPlayerResult = playerService.addAchievement(playerId, achievementId);
            if (updatedPlayerResult != null) {
                return ResponseEntity.ok("Player with id " + playerId + " successfully given achievement: " + achievementId);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player with id " + playerId + " not found.");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Deletes a player by ID.
     *
     * @param playerId the ID of the player to delete
     * @return ResponseEntity indicating the success of the deletion
     */
    @DeleteMapping("/delete/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.ok("Player with id " + playerId + " deleted successfully.");
    }

    /**
     * Retrieves a player by ID.
     *
     * @param id the ID of the player
     * @return ResponseEntity containing the player details
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable String id) {
        Player player = playerService.getPlayerByID(id);
        if (player != null) {
            return ResponseEntity.ok(player);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Retrieves the ID of a player by username.
     *
     * @param username the username of the player
     * @return ResponseEntity containing the player's ID
     */
    @GetMapping("/id-by-username/{username}")
    public ResponseEntity<String> getUserIdByUsername(@PathVariable String username) {
        try {
            String userId = playerService.getUserIdByUsername(username);
            return ResponseEntity.ok(userId);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}