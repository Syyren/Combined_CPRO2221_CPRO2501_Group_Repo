package com.brcg.coolcatgames.feature.userRegistration.controller;


import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> loginPlayer(@RequestBody Player player, HttpServletRequest request) {
        Player existingPlayer = playerServices.getPlayerByID(player.getId());
        logger.info("Received login request: Method = {}, URI = {}", request.getMethod(), request.getRequestURI());
        if (existingPlayer != null && passwordEncoder.matches(player.getPassword(), existingPlayer.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    private static final Logger logger = LoggerFactory.getLogger(Player.class);
    @GetMapping("/login")
    public ResponseEntity<String> handleIncorrectGetMethod(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        logger.info("Incorrect GET request to /login from IP: {} with User-Agent: {}", ip, userAgent);

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("Please use POST to log in.");
    }
}