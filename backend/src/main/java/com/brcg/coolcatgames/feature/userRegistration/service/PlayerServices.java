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
import java.util.NoSuchElementException;

@Service
public class PlayerServices implements UserDetailsService {
    @Autowired
    private PlayerRepository playerRepository;


    public void saveorUpdate(Player players) {
        playerRepository.save(players);
    }

    public Iterable<Player> listAll() {

        return this.playerRepository.findAll();
    }


    public void deletePlayer(String playerid) {
        playerRepository.deleteById(playerid);
    }

    public Player getPlayerByUsername(String username) {
        return playerRepository.findByUserName(username);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUserName(username);

        return new org.springframework.security.core.userdetails.User(player.getUserName(), player.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }


    public Player updatePlayer(int playerId, Player updatedPlayer) {


        return updatedPlayer;
    }


}


