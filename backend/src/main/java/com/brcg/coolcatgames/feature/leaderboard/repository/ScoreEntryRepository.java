package com.brcg.coolcatgames.feature.leaderboard.repository;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Document(collection = "Scores")
public interface ScoreEntryRepository extends MongoRepository<ScoreEntry, String> {
    // Find scores by gameId
    List<ScoreEntry> findByGameName(String gameName);

    // Find scores by userId
    List<ScoreEntry> findByUserId(String userId);

    // Find scores by userId and gameName
    List<ScoreEntry> findByUserIdAndGameName(String userId, String gameName);

    // Delete Scores by ID
    void deleteByIdIn(List<String> ids);
}
