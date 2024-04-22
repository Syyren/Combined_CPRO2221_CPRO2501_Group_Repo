package com.brcg.coolcatgames.feature.userRegistration.repository;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for Player entities.
 */
public interface PlayerRepository extends MongoRepository<Player, String> {
    /**
     * Retrieves a player by their username.
     *
     * @param userName the username of the player
     * @return the player with the specified username, or null if not found
     */
    Player findByUsername(String userName);

    Player findByEmail(String email);
}
