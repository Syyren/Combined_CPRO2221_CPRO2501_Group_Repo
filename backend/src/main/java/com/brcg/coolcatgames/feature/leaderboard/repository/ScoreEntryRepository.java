package com.brcg.coolcatgames.feature.leaderboard.repository;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Document(collection = "scores")
public interface ScoreEntryRepository extends MongoRepository<ScoreEntry, String> {
    // Find scores by gameId
    List<ScoreEntry> findByGameName(String gameName, Sort score);

    // Find scores by userId
    List<ScoreEntry> findByUserId(String userId, Sort score);

    // Find scores by userId and gameName with optional sorting
    List<ScoreEntry> findByUserIdAndGameName(String userId, String gameName);

    // Delete scores by Id
    void deleteByIdIn(List<String> idsToDelete);
}
