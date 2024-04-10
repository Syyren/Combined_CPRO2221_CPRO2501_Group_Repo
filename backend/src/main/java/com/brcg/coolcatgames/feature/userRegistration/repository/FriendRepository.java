package com.brcg.coolcatgames.feature.userRegistration.repository;
import com.brcg.coolcatgames.feature.userRegistration.model.Friend;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerServices;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

// Friend repository
public interface FriendRepository extends MongoRepository<Friend, String> {
    List<Friend> findByPlayerIdAndStatus(String playerId, String status);

}
