package com.brcg.coolcatgames.feature.arcadeshooter.repository;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ArcadeShooterSessionRepository extends MongoRepository<ArcadeShooterSession, String> {

    List<ArcadeShooterSession> findByUserId(String userId);
}