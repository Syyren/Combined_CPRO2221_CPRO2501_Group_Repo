package com.brcg.coolcatgames.feature.userRegistration.service;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;


@Service
public class PlayerService implements UserDetailsService {
    @Autowired
    private PlayerRepository playerRepository;

    public void register(Player player) {
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

    public Player updatePlayer(String playerId, Player updatedPlayer) {
        Player player = getPlayerByID(playerId);
        if (player != null) {
            player.setFirstName(updatedPlayer.getFirstName());
            player.setUsername(updatedPlayer.getUsername());
            player.setEmail(updatedPlayer.getEmail());
            player.setPassword(updatedPlayer.getPassword());
            return playerRepository.save(player);
        }
        return null;
    }
}


