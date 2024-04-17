package com.brcg.coolcatgames.leaderboard;


import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.repository.ScoreEntryRepository;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for the ScoreEntryService class.
 */
@ExtendWith(MockitoExtension.class)
public class ScoreEntryServiceTest {

    @Mock
    private ScoreEntryRepository repository;

    @InjectMocks
    private ScoreEntryService service;

    private ScoreEntry scoreEntry;

    /**
     * Initializes the objects used across multiple test cases.
     */
    @BeforeEach
    void setUp() {
        scoreEntry = new ScoreEntry();
        scoreEntry.setUserId("user123");
        scoreEntry.setGameName("Chess");
        scoreEntry.setScore(500);
    }

    /**
     * Tests the successful retrieval of all scores.
     */
    @Test
    void testGetAllScores_Success() throws Exception {
        when(repository.findAll(Sort.by(Sort.Direction.DESC, "score"))).thenReturn(Arrays.asList(scoreEntry));
        List<ScoreEntry> results = service.getAllScores();
        assertNotNull(results);
        assertEquals(1, results.size());
        verify(repository).findAll(Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the scenario where no scores are found.
     */
    @Test
    void testGetAllScores_Failure_EmptyList() throws Exception {
        when(repository.findAll(Sort.by(Sort.Direction.DESC, "score"))).thenReturn(new ArrayList<>());
        List<ScoreEntry> results = service.getAllScores();
        assertNotNull(results);
        assertTrue(results.isEmpty());
        verify(repository).findAll(Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the successful retrieval of scores by game.
     */
    @Test
    void testGetScoresByGame_Success() throws Exception {
        when(repository.findByGameName("Chess", Sort.by(Sort.Direction.DESC, "score"))).thenReturn(Arrays.asList(scoreEntry));
        List<ScoreEntry> results = service.getScoresByGame("Chess");
        assertNotNull(results);
        assertEquals(1, results.size());
        verify(repository).findByGameName("Chess", Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the scenario where no scores are found for a game.
     */
    @Test
    void testGetScoresByGame_Failure_EmptyList() throws Exception {
        when(repository.findByGameName("Chess", Sort.by(Sort.Direction.DESC, "score"))).thenReturn(new ArrayList<>());
        List<ScoreEntry> results = service.getScoresByGame("Chess");
        assertNotNull(results);
        assertTrue(results.isEmpty());
        verify(repository).findByGameName("Chess", Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the successful retrieval of scores by user.
     */
    @Test
    void testGetScoresByUser_Success() throws Exception {
        when(repository.findByUserId("user123", Sort.by(Sort.Direction.DESC, "score"))).thenReturn(Arrays.asList(scoreEntry));
        List<ScoreEntry> results = service.getScoresByUser("user123");
        assertNotNull(results);
        assertEquals(1, results.size());
        verify(repository).findByUserId("user123", Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the scenario where no scores are found for a user.
     */
    @Test
    void testGetScoresByUser_Failure_EmptyList() throws Exception {
        when(repository.findByUserId("user123", Sort.by(Sort.Direction.DESC, "score"))).thenReturn(Collections.emptyList());
        List<ScoreEntry> results = service.getScoresByUser("user123");
        assertNotNull(results);
        assertTrue(results.isEmpty());
        verify(repository).findByUserId("user123", Sort.by(Sort.Direction.DESC, "score"));
    }

    /**
     * Tests the successful retrieval of scores by user and game.
     */
    @Test
    void testGetScoresByUserAndGame_Success() throws Exception {
        when(repository.findByUserIdAndGameName("user123", "Chess")).thenReturn(Arrays.asList(scoreEntry));
        List<ScoreEntry> results = service.getScoresByUserAndGame("user123", "Chess");
        assertNotNull(results);
        assertEquals(1, results.size());
        verify(repository).findByUserIdAndGameName("user123", "Chess");
    }

    /**
     * Tests the scenario where no scores are found for a user and game.
     */
    @Test
    void testGetScoresByUserAndGame_Failure_EmptyList() throws Exception {
        when(repository.findByUserIdAndGameName("user123", "Chess")).thenReturn(Collections.emptyList());
        List<ScoreEntry> results = service.getScoresByUserAndGame("user123", "Chess");
        assertNotNull(results);
        assertTrue(results.isEmpty());
        verify(repository).findByUserIdAndGameName("user123", "Chess");
    }

    /**
     * Creates a valid ScoreEntry object for testing purposes.
     */
    public ScoreEntry createValidScoreEntry() {
        ScoreEntry scoreEntry = new ScoreEntry();
        scoreEntry.setId("someUniqueId"); // Assign a unique ID.
        scoreEntry.setGameName("test"); // Set to 'test' for easier identification.
        scoreEntry.setUserId("someUserId"); // User identifier.
        scoreEntry.setScore(100); // Some score value.
        scoreEntry.setLeaderboard("Score"); // Use either "Score" or "Elo".
        return scoreEntry;
    }

    /**
     * Tests the successful submission of a score.
     */
    @Test
    void testSubmitScore_Success() {
        ScoreEntry validScoreEntry = createValidScoreEntry();
        when(repository.save(any(ScoreEntry.class))).thenReturn(validScoreEntry);
        ScoreEntry result = service.submitScore(validScoreEntry);
        assertNotNull(result, "The saved score entry should not be null.");
        assertEquals(validScoreEntry.getScore(), result.getScore(), "Scores should match.");
        assertEquals(validScoreEntry.getUserId(), result.getUserId(), "User IDs should match.");
        assertEquals(validScoreEntry.getGameName(), result.getGameName(), "Game names should match.");
        assertEquals(validScoreEntry.getLeaderboard(), result.getLeaderboard(), "Leaderboard types should match.");
        verify(repository).save(validScoreEntry);
    }

    /**
     * Tests the scenario where submission of a score fails.
     */
    @Test
    void testSubmitScore_Failure_NullResult() {
        ScoreEntry validScoreEntry = createValidScoreEntry();
        when(repository.save(any(ScoreEntry.class))).thenReturn(null);
        ScoreEntry result = service.submitScore(validScoreEntry);
        assertNull(result, "The saved score entry should be null in case of failure.");
        verify(repository).save(validScoreEntry);
    }
}