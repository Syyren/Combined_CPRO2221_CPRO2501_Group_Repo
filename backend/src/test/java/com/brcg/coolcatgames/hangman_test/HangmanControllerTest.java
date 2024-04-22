package com.brcg.coolcatgames.hangman_test;

import com.brcg.coolcatgames.feature.hangman.controller.HangmanController;
import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import com.brcg.coolcatgames.feature.hangman.model.HangmanGameState;
import com.brcg.coolcatgames.feature.hangman.service.HangmanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class HangmanControllerTest {

    @Mock
    private HangmanService hangmanService;

    @InjectMocks
    private HangmanController hangmanController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getGameStateTest() {
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanService.getGameState()).thenReturn(expectedGameState);
        HangmanGameState actualGameState = hangmanController.getGameState();
        assertEquals(expectedGameState, actualGameState);
        verify(hangmanService, times(1)).getGameState();
    }

    @Test
    void newGameTest() {
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanService.newGame()).thenReturn(expectedGameState);

        ResponseEntity<HangmanGameState> responseEntity = hangmanController.newGame();

        assertEquals(expectedGameState, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanService, times(1)).newGame();
    }

    @Test
    void continueGameTest() {
        HangmanGameState expectedGameState = new HangmanGameState();
        when(hangmanService.continueGame()).thenReturn(expectedGameState);

        ResponseEntity<HangmanGameState> responseEntity = hangmanController.continueGame();

        assertEquals(expectedGameState, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanService, times(1)).continueGame();
    }

    @Test
    void guessLetterTest() {
        char letterGuessed = 'A';
        Hangman updatedHangman = new Hangman();
        when(hangmanService.guessLetter(letterGuessed)).thenReturn(updatedHangman);

        ResponseEntity<Hangman> responseEntity = hangmanController.guessLetter(letterGuessed);

        assertEquals(updatedHangman, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(hangmanService, times(1)).guessLetter(letterGuessed);
    }


}
