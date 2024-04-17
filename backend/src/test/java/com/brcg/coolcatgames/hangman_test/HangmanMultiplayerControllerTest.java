package com.brcg.coolcatgames.hangman_test;

import com.brcg.coolcatgames.feature.multiplayer.hangman.controller.HangmanMultiplayerController;
import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.multiplayer.hangman.service.HangmanMultiplayerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class HangmanMultiplayerControllerTest {

    @Mock
    private HangmanMultiplayerService hangmanMultiplayerService;

    @InjectMocks
    private HangmanMultiplayerController hangmanMultiplayerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getGameStateTest() {
        String roomId = "testRoomId";
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanMultiplayerService.getGameState(roomId)).thenReturn(expectedGameState);

        HangmanGameState actualGameState = hangmanMultiplayerController.getGameState(roomId);

        assertEquals(expectedGameState, actualGameState);
        verify(hangmanMultiplayerService, times(1)).getGameState(roomId);
    }

    @Test
    void newGameTest() {
        String roomId = "testRoomId";
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanMultiplayerService.newGame(roomId)).thenReturn(expectedGameState);

        ResponseEntity<HangmanGameState> responseEntity = hangmanMultiplayerController.newGame(roomId);

        assertEquals(expectedGameState, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanMultiplayerService, times(1)).newGame(roomId);
    }

    @Test
    void continueGameTest() {
        String roomId = "testRoomId";
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanMultiplayerService.continueGame(roomId)).thenReturn(expectedGameState);

        ResponseEntity<HangmanGameState> responseEntity = hangmanMultiplayerController.continueGame(roomId);

        assertEquals(expectedGameState, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanMultiplayerService, times(1)).continueGame(roomId);
    }

    @Test
    void guessLetterTest() {
        String roomId = "testRoomId";
        char letterGuessed = 'A';
        String userId = "testUserId";
        Hangman updatedHangman = new Hangman();
        when(hangmanMultiplayerService.guessLetter(roomId, letterGuessed, userId)).thenReturn(updatedHangman);

        ResponseEntity<Hangman> responseEntity = hangmanMultiplayerController.guessLetter(roomId, letterGuessed, userId);

        assertEquals(updatedHangman, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanMultiplayerService, times(1)).guessLetter(roomId, letterGuessed, userId);
    }
}

