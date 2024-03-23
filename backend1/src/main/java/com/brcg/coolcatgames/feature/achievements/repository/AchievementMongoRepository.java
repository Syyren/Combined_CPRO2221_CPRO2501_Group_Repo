package com.brcg.coolcatgames.feature.achievements.repository;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AchievementMongoRepository extends MongoRepository<Achievement, Integer>
{
    //Hello, this interface is for use with the AchievementRepository
}
