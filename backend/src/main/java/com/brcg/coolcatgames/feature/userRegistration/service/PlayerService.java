package com.brcg.coolcatgames.feature.userRegistration.service;

import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


/**
 * Service class for managing player entities.
 */
@Service
public class PlayerService implements UserDetailsService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private AchievementService achievementService;

    /**
     * Registers a new player.
     *
     * @param newPlayer the player to register
     */
    public void register(Player newPlayer) {
        newPlayer.setAchievements(new ArrayList<>());
        newPlayer.setFriends(new ArrayList<>());
        playerRepository.save(newPlayer);
    }

    /**
     * Checks if the username is taken.
     *
     * @param username the username to check
     */
    public boolean usernameExists(String username) {
        try {
            UserDetails user = loadUserByUsername(username);
            return user != null;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }

    /**
     * Retrieves all players.
     *
     * @return an iterable of all players
     */
    public Iterable<Player> listAll() {
        return playerRepository.findAll();
    }

    /**
     * Deletes a player by their ID.
     *
     * @param playerId the ID of the player to delete
     */
    public void deletePlayer(String playerId) {
        playerRepository.deleteById(playerId);
    }

    /**
     * Retrieves a player by their ID.
     *
     * @param playerId the ID of the player to retrieve
     * @return the player with the specified ID
     * @throws UsernameNotFoundException if the player is not found
     */
    public Player getPlayerByID(String playerId) {
        Optional<Player> player = playerRepository.findById(playerId);
        return player.orElseThrow(() -> new UsernameNotFoundException("Player not found with id: " + playerId));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUsername(username);
        if (player == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(player.getUsername(), player.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("USER")));
    }

    /**
     * Retrieves the ID of a user by their username.
     *
     * @param username the username of the user
     * @return the ID of the user
     * @throws UsernameNotFoundException if the user is not found
     */
    public String getUserIdByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUsername(username);
        if (player == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return player.getId();
    }

    /**
     * Adds an achievement to a player.
     *
     * @param playerId       the ID of the player
     * @param achievementId  the ID of the achievement to add
     * @return the updated player
     */
    public Player addAchievement(String playerId, int achievementId) {
        Player player = getPlayerByID(playerId);
        if (player != null) {
            if (player.getAchievements() == null) {
                player.setAchievements(new ArrayList<>());
            }
            achievementService.getById(achievementId);
            ArrayList<Integer> tempList = player.getAchievements();
            boolean hasMatchingId = tempList.stream()
                    .anyMatch(a -> a == achievementId);
            if (hasMatchingId) {
                throw new RuntimeException("User already has this achievement!");
            }
            tempList.add(achievementId);
            player.setAchievements(tempList);
            return playerRepository.save(player);
        }
        return null;
    }

    /**
     * Updates a player's information.
     *
     * @param playerId      the ID of the player to update
     * @param updatedPlayer the updated player information
     * @return the updated player
     */
    public Player updatePlayer(String playerId, Player updatedPlayer) {
        Player player = getPlayerByID(playerId);
        if (player != null) {
            player.setFirstName(updatedPlayer.getFirstName());
            player.setUsername(updatedPlayer.getUsername());
            player.setEmail(updatedPlayer.getEmail());
            player.setPassword(updatedPlayer.getPassword());
            player.setAchievements(updatedPlayer.getAchievements());
            return playerRepository.save(player);
        }
        return null;
    }

    public Player findUserByEmail(String email) {
        return playerRepository.findByEmail(email);
    }

    /**
     * Checks if the provided security question and answer match an account.
     *
     * @param email            the email of the account
     * @param securityQuestion the security question
     * @param answer           the answer to the security question
     * @return true if the security question and answer match an account, false otherwise
     */
    public boolean checkSecurityQuestion(String email, String securityQuestion, String answer) {
        // Retrieve the player by email
        Player player = playerRepository.findByEmail(email);
        if (player != null) {
            // Check if the security question and answer match the player's security question and answer
            return securityQuestion.equals(player.getSecurityQuestion()) && answer.equals(player.getSecurityAnswer());
        }
        return false;
    }
}
