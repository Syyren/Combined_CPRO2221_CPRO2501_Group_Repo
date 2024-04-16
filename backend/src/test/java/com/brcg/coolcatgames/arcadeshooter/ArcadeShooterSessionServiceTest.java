package com.brcg.coolcatgames.arcadeshooter;

import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.repository.ArcadeShooterSessionRepository;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Tests for ArcadeShooterSessionService.
 */
@ExtendWith(MockitoExtension.class)
public class ArcadeShooterSessionServiceTest {

    @Mock
    private ArcadeShooterSessionRepository sessionRepository;

    @Mock
    private ScoreEntryService scoreEntryService;

    @InjectMocks
    private ArcadeShooterSessionService sessionService;

    private ArcadeShooterSession session;

    @BeforeEach
    void setUp() {
        session = new ArcadeShooterSession();
        session.setId("sessionId");
        session.setUserId("userId");
        session.setStartTime(LocalDateTime.now());
        session.setFinalScore(0);
        session.setLevelReached(0);
    }

    @Test
    void testStartSession_Success() {
        when(sessionRepository.save(any(ArcadeShooterSession.class))).thenReturn(session);
        ArcadeShooterSession createdSession = sessionService.startSession("userId");
        assertNotNull(createdSession);
        assertEquals("userId", createdSession.getUserId());
        verify(sessionRepository).save(any(ArcadeShooterSession.class));
    }

    @Test
    void testStartSession_Failure_NullData() {
        when(sessionRepository.save(any(ArcadeShooterSession.class))).thenReturn(null);
        ArcadeShooterSession createdSession = sessionService.startSession("userId");
        assertNull(createdSession);
    }

    @Test
    void testEndSession_Success() {
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        when(sessionRepository.save(session)).thenReturn(session);
        ArcadeShooterSession endedSession = sessionService.endSession("sessionId", 100, 10);

        assertNotNull(endedSession);
        assertEquals(100, endedSession.getFinalScore());
        assertEquals(10, endedSession.getLevelReached());
        assertNotNull(endedSession.getEndTime());
        verify(sessionRepository).save(session);
        verify(scoreEntryService).submitScore(any(ScoreEntry.class));
    }

    @Test
    void testEndSession_Failure_SessionNotFound() {
        // Simulate the repository not finding the session by returning an empty Optional
        when(sessionRepository.findById("nonExistentSessionId")).thenReturn(Optional.empty());

        // Attempt to end a session that does not exist
        ArcadeShooterSession endedSession = sessionService.endSession("nonExistentSessionId", 100, 10);

        // Assert that the result is null, indicating the session was not found and hence not ended
        assertNull(endedSession);

        // Verify that no further interactions (like saving or creating score entries) happen with the repository and score service
        verify(sessionRepository, never()).save(any(ArcadeShooterSession.class));
        verify(scoreEntryService, never()).submitScore(any(ScoreEntry.class));
    }

    @Test
    void testUpdateSession_Success() {
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        when(sessionRepository.save(session)).thenReturn(session);
        session.setFinalScore(150);
        session.setLevelReached(5);

        ArcadeShooterSession updatedSession = sessionService.updateSession("sessionId", session);
        assertEquals(150, updatedSession.getFinalScore());
        assertEquals(5, updatedSession.getLevelReached());
        verify(sessionRepository).save(session);
    }

    @Test
    void testUpdateSession_NotFound() {
        when(sessionRepository.findById("nonExistentSessionId")).thenReturn(Optional.empty());
        ArcadeShooterSession sessionToUpdate = new ArcadeShooterSession();
        sessionToUpdate.setId("nonExistentSessionId");
        sessionToUpdate.setFinalScore(200);
        sessionToUpdate.setLevelReached(10);

        ArcadeShooterSession updatedSession = sessionService.updateSession("nonExistentSessionId", sessionToUpdate);
        assertNull(updatedSession);
    }

    @Test
    void testGetSessionById_Found() {
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        ArcadeShooterSession retrievedSession = sessionService.getSessionById("sessionId");
        assertEquals("sessionId", retrievedSession.getId());
    }

    @Test
    void testGetSessionById_NotFound() {
        when(sessionRepository.findById("nonExistentSessionId")).thenReturn(Optional.empty());
        ArcadeShooterSession retrievedSession = sessionService.getSessionById("nonExistentSessionId");
        assertNull(retrievedSession);
    }

    @Test
    void testGetSessionsByUserId_Found() {
        when(sessionRepository.findByUserId("userId")).thenReturn(java.util.Arrays.asList(session));
        assertEquals(1, sessionService.getSessionsByUserId("userId").size());
    }

    @Test
    void testGetSessionsByUserId_NotFound() {
        when(sessionRepository.findByUserId("nonExistentUserId")).thenReturn(Collections.emptyList());
        assertTrue(sessionService.getSessionsByUserId("nonExistentUserId").isEmpty());
    }

    @Test
    void testDeleteSession_Success() {
        when(sessionRepository.findById("sessionId")).thenReturn(Optional.of(session));
        doNothing().when(sessionRepository).delete(session);
        assertTrue(sessionService.deleteSession("sessionId"));
        verify(sessionRepository).delete(session);
    }

    @Test
    void testDeleteSession_NotFound() {
        when(sessionRepository.findById("nonExistentSessionId")).thenReturn(Optional.empty());
        assertFalse(sessionService.deleteSession("nonExistentSessionId"));
    }
}
