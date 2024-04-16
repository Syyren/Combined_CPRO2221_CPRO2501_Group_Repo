package com.brcg.coolcatgames.feature.arcadeshooter.repository;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;


/**
 * Repository interface for managing arcade shooter session entities.
 */
public interface ArcadeShooterSessionRepository extends MongoRepository<ArcadeShooterSession, String> {

    /**
     * Finds arcade shooter sessions by user ID.
     *
     * @param userId the ID of the user
     * @return a list of arcade shooter sessions associated with the user
     */
    List<ArcadeShooterSession> findByUserId(String userId);
}