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
import java.util.Optional;


@Service
public class PlayerService implements UserDetailsService {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private AchievementService achievementService;

    public void register(Player player) {
        player.setAchievements(new ArrayList<>());
        playerRepository.save(player);
    }

    public Iterable<Player> listAll() {
        return playerRepository.findAll();
    }

    public void deletePlayer(String playerId) {
        playerRepository.deleteById(playerId);
    }

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

    public String getUserIdByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUsername(username);
        if (player == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return player.getId();
    }

    public Player addAchievement(String playerId, int achievementId)
    {
        Player player = getPlayerByID(playerId);
        if (player != null)
        {
            if (player.getAchievements() == null) { player.setAchievements(new ArrayList<>()); }
            achievementService.getById(achievementId);
            ArrayList<Integer> tempList = player.getAchievements();
            boolean hasMatchingId = tempList.stream()
                    .anyMatch(a -> a == achievementId);
            if (hasMatchingId) { throw new RuntimeException("User already has this achievement!"); };
            tempList.add(achievementId);
            player.setAchievements(tempList);
            return playerRepository.save(player);
        }
        return null;
    }

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
}


