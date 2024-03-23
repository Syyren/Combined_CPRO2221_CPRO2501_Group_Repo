package com.brcg.coolcatgames.feature.userRegistration.repository;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerServices;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayerRepository extends MongoRepository <Player, String>{
    Player findByUserName(String userName);


}

