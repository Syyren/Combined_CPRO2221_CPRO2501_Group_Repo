package com.brcg.coolcatgames.feature.leaderboard.repository;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "Scores")
public interface ScoreEntryRepository extends MongoRepository<ScoreEntry, String> {
}
