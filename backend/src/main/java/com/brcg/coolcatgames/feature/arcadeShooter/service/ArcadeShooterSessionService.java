package com.brcg.coolcatgames.feature.arcadeShooter.service;

import com.brcg.coolcatgames.feature.arcadeShooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeShooter.repository.ArcadeShooterSessionRepository;
import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArcadeShooterSessionService {

    private final ArcadeShooterSessionRepository sessionRepository;
    private final ScoreEntryService scoreEntryService;

    public ArcadeShooterSession startSession(String userId) {
        ArcadeShooterSession newSession = new ArcadeShooterSession();
        newSession.setUserId(userId);
        newSession.setStartTime(LocalDateTime.now());
        newSession.setEndTime(null);
        newSession.setFinalScore(0);
        newSession.setLevelReached(0);
        return sessionRepository.save(newSession);
    }

    public ArcadeShooterSession endSession(String id, int finalScore, int levelReached) {
        return sessionRepository.findById(id)
                .map(session -> {
                    session.setEndTime(LocalDateTime.now());
                    session.setFinalScore(finalScore);
                    session.setLevelReached(levelReached);
                    ArcadeShooterSession updatedSession = sessionRepository.save(session);

                    // Create and save a ScoreEntry object
                    ScoreEntry scoreEntry = new ScoreEntry();
                    scoreEntry.setGameName("canine_invaders");
                    scoreEntry.setUserId(session.getUserId());
                    scoreEntry.setScore(finalScore);
                    scoreEntry.setLeaderboard("Score");
                    scoreEntryService.submitScore(scoreEntry);

                    return updatedSession;
                })
                .orElse(null);
    }

    public ArcadeShooterSession updateSession(String id, ArcadeShooterSession session) {
        return sessionRepository.findById(id)
                .map(existingSession -> {
                    existingSession.setEndTime(session.getEndTime());
                    existingSession.setFinalScore(session.getFinalScore());
                    existingSession.setLevelReached(session.getLevelReached());

                    return sessionRepository.save(existingSession);
                })
                .orElse(null); // or throw a custom exception
    }

    public ArcadeShooterSession getSessionById(String id) {
        // Fetch a session by its ID
        return sessionRepository.findById(id).orElse(null);
    }

    public List<ArcadeShooterSession> getSessionsByUserId(String userId) {
        return sessionRepository.findByUserId(userId);
    }

    public boolean deleteSession(String id) {
        return sessionRepository.findById(id)
                .map(session -> {
                    sessionRepository.delete(session);
                    return true;
                })
                .orElse(false);
    }
}
