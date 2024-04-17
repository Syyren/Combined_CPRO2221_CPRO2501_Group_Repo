package com.brcg.coolcatgames.feature.leaderboard.service;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.repository.ScoreEntryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing score entries in the leaderboard.
 */
@Service
public class ScoreEntryService {

    @Autowired
    private ScoreEntryRepository repository;

    /**
     * Retrieve all scores from the leaderboard.
     * @return List of all score entries, sorted by score in descending order.
     */
    public List<ScoreEntry> getAllScores() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Retrieve scores for a specific game from the leaderboard.
     * @param gameName The name of the game.
     * @return List of score entries for the specified game, sorted by score in descending order.
     */
    public List<ScoreEntry> getScoresByGame(String gameName) {
        return repository.findByGameName(gameName, Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Retrieve scores for a specific user from the leaderboard.
     * @param userId The ID of the user.
     * @return List of score entries for the specified user, sorted by score in descending order.
     */
    public List<ScoreEntry> getScoresByUser(String userId) {
        return repository.findByUserId(userId, Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Retrieve scores for a specific user and game from the leaderboard.
     * @param userId The ID of the user.
     * @param gameName The name of the game.
     * @return List of score entries for the specified user and game.
     */
    public List<ScoreEntry> getScoresByUserAndGame(String userId, String gameName) {
        return repository.findByUserIdAndGameName(userId, gameName);
    }

    /**
     * Submit a new score entry to the leaderboard.
     * @param newScore The new score entry to submit.
     * @return The saved score entry if it meets the leaderboard criteria, otherwise null.
     */
    @Transactional
    public ScoreEntry submitScore(ScoreEntry newScore) {
        // Fetch all existing scores for the user and game
        List<ScoreEntry> scores = repository.findByUserIdAndGameName(newScore.getUserId(), newScore.getGameName());

        // Sort scores in descending order to prioritize higher scores
        scores.sort(Comparator.comparing(ScoreEntry::getScore).reversed());

        if ("Score".equals(newScore.getLeaderboard())) {
            // Add the new score temporarily for comparison
            List<ScoreEntry> scoresIncludingNew = new ArrayList<>(scores);
            scoresIncludingNew.add(newScore);
            scoresIncludingNew.sort(Comparator.comparing(ScoreEntry::getScore).reversed());

            // Determine if newScore is within the top 3
            boolean isNewScoreInTop3 = scoresIncludingNew.indexOf(newScore) < 3;

            // Keep only the top 3 scores
            if (isNewScoreInTop3) {
                if (scores.size() >= 3) {
                    // Remove the lowest score if there are already 3 scores
                    repository.delete(scores.get(2)); // Delete the third score, assuming list is already sorted
                }
                return repository.save(newScore);
            }
            return null; // Return null if the new score does not make it into the top 3
        } else if ("Elo".equals(newScore.getLeaderboard())) {
            // For "Elo" leaderboards, replace all existing scores
            repository.deleteAll(scores); // Efficient bulk delete
            return repository.save(newScore); // Save the new score
        }

        // Fallback scenario, should not be reached as per your game logic
        return null;
    }
}

