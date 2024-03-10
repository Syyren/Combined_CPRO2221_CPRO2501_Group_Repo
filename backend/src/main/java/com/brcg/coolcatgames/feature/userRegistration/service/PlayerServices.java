package com.brcg.coolcatgames.feature.userRegistration.service;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerServices {
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

    public Player getPlayerByID(String playerid) {
        return playerRepository.findById(playerid).get();
    }


    public Player updatePlayer(int playerId, Player updatedPlayer) {


        return updatedPlayer;
    }
}


