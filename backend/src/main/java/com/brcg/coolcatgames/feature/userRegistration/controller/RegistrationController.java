package com.brcg.coolcatgames.feature.userRegistration.controller;


import com.brcg.coolcatgames.feature.userRegistration.model.Friend;
import com.brcg.coolcatgames.feature.userRegistration.model.FriendDTO;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.FriendService;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Collections;


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

    @Autowired
    private FriendService friendService;


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


    @PostMapping("/login")
    public ResponseEntity<String> getPlayerByUsernameAndPassword(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Player player = playerServices.getPlayerByUsername(username);

        if (player != null && passwordEncoder.matches(password, player.getPassword())) {
            // Log successful authentication
            System.out.println("User authenticated: " + player.getUserName());
            return ResponseEntity.ok("Welcome back! " + player.getUserName());
        } else {
            // Log authentication failure
            System.out.println("Authentication failed for username: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


    //endpoint for fetching friendlist
    @GetMapping("/{playerId}/friends")
    public ResponseEntity<List<FriendDTO>> getFriendListWithDetails(@PathVariable String playerId) {
        List<FriendDTO> friendDTOList = friendService.getFriendListWithDetails(playerId);
        if (friendDTOList.isEmpty()) {
            // If there are no friends, return a response with a message
            return ResponseEntity.ok().body(Collections.singletonList(new FriendDTO("No friends found")));
        } else {
            // If there are friends, return a response with the list of friends
            return ResponseEntity.ok(friendDTOList);
        }
    }





    //endpoint for add friends
    @PostMapping("/friends")
    public ResponseEntity<String> addFriend(@RequestBody Map<String, String> requestBody) {
        // Retrieve playerId and friendId from the request body
        String playerId = requestBody.get("playerId");
        String friendId = requestBody.get("friendId");

        // Check if playerId and friendId are provided
        if (playerId == null || playerId.isEmpty() || friendId == null || friendId.isEmpty()) {
            // Return a bad request response if playerId or friendId is missing
            return ResponseEntity.badRequest().body("Both playerId and friendId are required to add a friend.");
        }

        // Call the friendService to add the friend
        friendService.addFriend(playerId, friendId);

        // Return a success response
        return ResponseEntity.ok("Friend added successfully.");
    }


}