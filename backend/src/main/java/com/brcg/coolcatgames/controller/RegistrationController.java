package com.brcg.coolcatgames.controller;

import com.brcg.coolcatgames.model.Player;
import com.brcg.coolcatgames.repository.PlayerRepository;
import com.brcg.coolcatgames.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/players")
public class RegistrationController {

    @Autowired
    private PlayerServices playerServices;


    // register new player
    @PostMapping(value = "/save")
    private String savePlayer(@RequestBody Player players) {

        playerServices.saveorUpdate(players);
        return players.getUserName();
    }

    @GetMapping(value = "/ getALL")
    private Iterable<Player> getPlayers() {


        return playerServices.listAll();
    }

    @PutMapping(value = "/ edit{userName}")
    private Player update(@RequestBody Player player, @PathVariable(name = "userName") String userName) {


        player.setUserName(userName);
        playerServices.saveorUpdate(player);
        return player;

    }
    @DeleteMapping( "/delete/{playerid}")
     private void deletePlayer(@PathVariable String playerid)
    {
        playerServices.deletePlayer(playerid);
    }

    @RequestMapping( "/player/{playerid}")
     private Player getPlayers(@PathVariable(name = "id")String playerid)
    {
    return playerServices.getPlayerByID(playerid);
}



}