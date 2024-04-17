package com.brcg.coolcatgames.feature.leaderboard.repository;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing score entries in the leaderboard.
 */
@Repository
@Document(collection = "scores")
public interface ScoreEntryRepository extends MongoRepository<ScoreEntry, String> {

    /**
     * Find scores by game name.
     * @param gameName The name of the game.
     * @param score Sort parameter for scores.
     * @return List of score entries.
     */
    List<ScoreEntry> findByGameName(String gameName, Sort score);

    /**
     * Find scores by user ID.
     * @param userId The ID of the user.
     * @param score Sort parameter for scores.
     * @return List of score entries.
     */
    List<ScoreEntry> findByUserId(String userId, Sort score);

    /**
     * Find scores by user ID and game name.
     * @param userId The ID of the user.
     * @param gameName The name of the game.
     * @return List of score entries.
     */
    List<ScoreEntry> findByUserIdAndGameName(String userId, String gameName);

    /**
     * Delete scores by their IDs.
     * @param ids List of score IDs to delete.
     */
    void deleteByIdIn(List<String> ids);
}