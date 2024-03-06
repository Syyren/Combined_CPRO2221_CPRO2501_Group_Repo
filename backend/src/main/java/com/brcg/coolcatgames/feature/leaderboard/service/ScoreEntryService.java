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
        // Fetch all scores for the user and game
        List<ScoreEntry> scores = repository.findByUserIdAndGameName(newScore.getUserId(), newScore.getGameName());

        if ("Score".equals(newScore.getLeaderboard())) {
            // "Score" leaderboard type
            scores.add(newScore); // Include the new score for comparison
            scores.sort((s1, s2) -> s2.getScore() - s1.getScore()); // Sort scores in descending order

            if (scores.size() > 3) {
                // Identify scores not in the top 3 to be deleted
                List<String> idsToDelete = scores.subList(3, scores.size()).stream()
                        .map(ScoreEntry::getId)
                        .collect(Collectors.toList());

                if (!idsToDelete.isEmpty()) {
                    repository.deleteAllById(idsToDelete); // Delete scores not in the top 3
                }
                scores = scores.subList(0, 3); // Retain only the top 3 scores
            }
            // Save the new score if it's among the top 3
            return repository.save(newScore);

        } else if ("Elo".equals(newScore.getLeaderboard())) {
            // "Elo" leaderboard type
            if (!scores.isEmpty()) {
                // Delete all existing scores for the user and game
                List<String> idsToDelete = scores.stream()
                        .map(ScoreEntry::getId)
                        .collect(Collectors.toList());
                repository.deleteAllById(idsToDelete);
            }
            // Save the new Elo score
            return repository.save(newScore);
        }

        // Default
        return null;
    }
}

