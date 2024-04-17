package com.brcg.coolcatgames.feature.arcadeshooter.service;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.repository.ArcadeShooterSessionRepository;
import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service class for managing arcade shooter sessions.
 */
@Service
@RequiredArgsConstructor
public class ArcadeShooterSessionService {

    private final ArcadeShooterSessionRepository sessionRepository;
    private final ScoreEntryService scoreEntryService;

    /**
     * Starts a new arcade shooter session for the given user.
     *
     * @param userId the ID of the user starting the session
     * @return the newly created session
     */
    public ArcadeShooterSession startSession(String userId) {
        ArcadeShooterSession newSession = new ArcadeShooterSession();
        newSession.setUserId(userId);
        newSession.setStartTime(LocalDateTime.now());
        newSession.setEndTime(null);
        newSession.setFinalScore(0);
        newSession.setLevelReached(0);
        return sessionRepository.save(newSession);
    }

    /**
     * Ends an existing arcade shooter session with the given ID.
     *
     * @param id          the ID of the session to end
     * @param finalScore  the final score achieved in the session
     * @param levelReached the highest level reached in the session
     * @return the ended session
     */
    @Transactional
    public ArcadeShooterSession endSession(String id, int finalScore, int levelReached) {
        return sessionRepository.findById(id)
                .map(session -> {
                    if (session.getEndTime() != null) {
                        return session;
                    }

                    // Set end time and other final details
                    session.setEndTime(LocalDateTime.now());
                    session.setFinalScore(finalScore);
                    session.setLevelReached(levelReached);
                    sessionRepository.save(session);

                    // Create and save a ScoreEntry only if the session is ending for the first time
                    ScoreEntry scoreEntry = new ScoreEntry();
                    scoreEntry.setGameName("canine_invaders");
                    scoreEntry.setUserId(session.getUserId());
                    scoreEntry.setScore(finalScore);
                    scoreEntry.setLeaderboard("Score");
                    scoreEntryService.submitScore(scoreEntry);

                    return session;
                })
                .orElse(null);
    }

    /**
     * Updates an existing arcade shooter session with new data.
     *
     * @param id      the ID of the session to update
     * @param session the updated session data
     * @return the updated session
     */
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

    /**
     * Retrieves an arcade shooter session by its ID.
     *
     * @param id the ID of the session to retrieve
     * @return the session if found, null otherwise
     */
    public ArcadeShooterSession getSessionById(String id) {
        return sessionRepository.findById(id).orElse(null);
    }

    /**
     * Retrieves all arcade shooter sessions associated with a user.
     *
     * @param userId the ID of the user
     * @return a list of sessions belonging to the user
     */
    public List<ArcadeShooterSession> getSessionsByUserId(String userId) {
        return sessionRepository.findByUserId(userId);
    }

    /**
     * Deletes an arcade shooter session by its ID.
     *
     * @param id the ID of the session to delete
     * @return true if the session was deleted, false otherwise
     */
    public boolean deleteSession(String id) {
        return sessionRepository.findById(id)
                .map(session -> {
                    sessionRepository.delete(session);
                    return true;
                })
                .orElse(false);
    }
}