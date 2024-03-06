package com.brcg.coolcatgames.feature.leaderboard.service;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.repository.ScoreEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoreEntryService {
    @Autowired
    private ScoreEntryRepository repository;

    public List<ScoreEntry> getAllScores() {
        return repository.findAll();
    }

    public List<ScoreEntry> getScoresByGame(String gameName) {
        return repository.findByGameName(gameName);
    }

    public List<ScoreEntry> getScoresByUser(String userId) {
        return repository.findByUserId(userId);
    }

    public List<ScoreEntry> getScoresByUserAndGame(String userId, String gameName) {
        return repository.findByUserIdAndGameName(userId, gameName);
    }

    public ScoreEntry submitScore(ScoreEntry newScore) {
        // Fetch all scores for the user and game, excluding the newScore
        List<ScoreEntry> scores = repository.findByUserIdAndGameName(newScore.getUserId(), newScore.getGameName());

        // Include newScore in comparison
        scores.add(newScore);

        // Sort scores in descending order to prioritize higher scores
        scores.sort(Comparator.comparing(ScoreEntry::getScore).reversed());

        // Determine if newScore is within the top 3
        boolean isNewScoreInTop3 = scores.size() <= 3 || scores.subList(0, 3).contains(newScore);

        if ("Score".equals(newScore.getLeaderboard())) {
            // Keep only the top 3 scores, deleting the rest if more than 3 exist
            if (scores.size() > 3) {
                List<String> idsToDelete = scores.subList(3, scores.size()).stream()
                        .map(ScoreEntry::getId)
                        .collect(Collectors.toList());

                // Delete scores not in the top 3
                if (!idsToDelete.isEmpty()) {
                    repository.deleteByIdIn(idsToDelete);
                }
            }
            // Save the new score if it's among the top 3
            if (isNewScoreInTop3){
                return repository.save(newScore);
            } else {
                return null;
            }

        } else if ("Elo".equals(newScore.getLeaderboard())) {
            // For "Elo", delete all existing scores for the user and game, then save the new score
            List<String> idsToDelete = scores.stream()
                    .map(ScoreEntry::getId)
                    .collect(Collectors.toList());

            if (!idsToDelete.isEmpty()) {
                repository.deleteByIdIn(idsToDelete);
            }

            return repository.save(newScore);
        }

        // Default return, should ideally never be reached
        return null;
    }
}

