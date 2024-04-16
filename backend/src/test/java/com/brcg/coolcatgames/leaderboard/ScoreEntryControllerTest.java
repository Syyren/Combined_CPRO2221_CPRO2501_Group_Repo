package com.brcg.coolcatgames.leaderboard;

import com.brcg.coolcatgames.feature.leaderboard.controller.ScoreEntryController;
import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for the ScoreEntryController class.
 */
@ExtendWith(MockitoExtension.class)
public class ScoreEntryControllerTest {

    @Mock
    private ScoreEntryService scoreEntryService;

    @InjectMocks
    private ScoreEntryController scoreEntryController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(scoreEntryController).build();
    }

    /**
     * Test case for retrieving all scores successfully.
     */
    @Test
    void testGetAllScores_Success() throws Exception {
        when(scoreEntryService.getAllScores()).thenReturn(Arrays.asList(new ScoreEntry(), new ScoreEntry()));
        mockMvc.perform(get("/scores/allscores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2));
    }

    /**
     * Test case for retrieving all scores when no scores are found.
     */
    @Test
    void testGetAllScores_NoScoresFound() throws Exception {
        when(scoreEntryService.getAllScores()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/scores/allscores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    /**
     * Test case for retrieving scores by game successfully.
     */
    @Test
    void testGetScoresByGame_Success() throws Exception {
        when(scoreEntryService.getScoresByGame("Chess")).thenReturn(Arrays.asList(new ScoreEntry()));
        mockMvc.perform(get("/scores/game/{gameName}", "Chess"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    /**
     * Test case for retrieving scores by game when the game is not found.
     */
    @Test
    void testGetScoresByGame_NotFound() throws Exception {
        when(scoreEntryService.getScoresByGame("Unknown")).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/scores/game/{gameName}", "Unknown"))
                .andExpect(status().isOk())
                .andExpect(content().string("[]"));
    }

    /**
     * Test case for retrieving scores by user successfully.
     */
    @Test
    void testGetScoresByUser_Success() throws Exception {
        when(scoreEntryService.getScoresByUser("user123")).thenReturn(Arrays.asList(new ScoreEntry()));
        mockMvc.perform(get("/scores/user/{userId}", "user123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    /**
     * Test case for retrieving scores by user when no scores are found.
     */
    @Test
    void testGetScoresByUser_NoScoresFound() throws Exception {
        when(scoreEntryService.getScoresByUser("user123")).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/scores/user/{userId}", "user123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    /**
     * Test case for retrieving scores by user and game successfully.
     */
    @Test
    void testGetScoresByUserAndGame_Success() throws Exception {
        when(scoreEntryService.getScoresByUserAndGame("user123", "Chess")).thenReturn(Arrays.asList(new ScoreEntry()));
        mockMvc.perform(get("/scores/user/{userId}/game/{gameName}", "user123", "Chess"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    /**
     * Test case for retrieving scores by user and game when no scores are found.
     */
    @Test
    void testGetScoresByUserAndGame_NoScoresFound() throws Exception {
        when(scoreEntryService.getScoresByUserAndGame("user123", "Chess")).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/scores/user/{userId}/game/{gameName}", "user123", "Chess"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    /**
     * Test case for submitting a score successfully.
     */
    @Test
    void testSubmitScore_Success() throws Exception {
        ScoreEntry scoreEntry = new ScoreEntry();
        scoreEntry.setUserId("user123");
        scoreEntry.setGameName("Chess");
        scoreEntry.setScore(100);

        when(scoreEntryService.submitScore(any(ScoreEntry.class))).thenReturn(scoreEntry);
        mockMvc.perform(post("/scores/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":\"user123\", \"gameName\":\"Chess\", \"score\":100}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("user123"))
                .andExpect(jsonPath("$.gameName").value("Chess"))
                .andExpect(jsonPath("$.score").value(100));
    }
}