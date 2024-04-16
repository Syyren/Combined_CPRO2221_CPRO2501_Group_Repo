package com.brcg.coolcatgames.feature.autorunner.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

public class AutoRunnerControllerTest {

    @Mock
    private ScoreEntryService scoreEntryService;

    @InjectMocks
    private AutoRunnerScoreController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSubmitScore() {
        //arrange
        String userId = "testUser";
        int scoreAmt = 1000;
        ScoreEntry mockScoreEntry = new ScoreEntry();
        mockScoreEntry.setGameName("cat-run");
        mockScoreEntry.setUserId(userId);
        mockScoreEntry.setScore(scoreAmt);
        mockScoreEntry.setLeaderboard("Score");

        Mockito.when(scoreEntryService.submitScore(any(ScoreEntry.class))).thenReturn(mockScoreEntry);

        //act
        ResponseEntity<?> responseEntity = controller.submitScore(userId, scoreAmt);

        //assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockScoreEntry, responseEntity.getBody());
    }

    @Test
    void testSubmitScoreError() {
        //arrange
        String userId = "testUser";
        int scoreAmt = 1000;
        ScoreEntry mockScoreEntry = new ScoreEntry();
        mockScoreEntry.setGameName("cat-run");
        mockScoreEntry.setUserId(userId);
        mockScoreEntry.setScore(scoreAmt);
        mockScoreEntry.setLeaderboard("Score");

        Mockito.when(scoreEntryService.submitScore(any(ScoreEntry.class))).thenThrow(new Error("Test Error"));

        //act
        ResponseEntity<?> responseEntity = controller.submitScore(userId, scoreAmt);

        //assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Could not save score: Test Error", responseEntity.getBody());
    }
}
