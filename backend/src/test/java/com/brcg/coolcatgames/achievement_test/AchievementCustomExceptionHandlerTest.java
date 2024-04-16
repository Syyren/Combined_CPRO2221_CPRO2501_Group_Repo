package com.brcg.coolcatgames.achievement_test;

import com.brcg.coolcatgames.feature.achievements.utils.AchievementCustomException;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementCustomExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AchievementCustomExceptionHandlerTest {

    private AchievementCustomExceptionHandler exceptionHandler;

    @BeforeEach
    void setUp() {
        exceptionHandler = new AchievementCustomExceptionHandler();
    }

    @Test
    void testHandleCustomException_ReturnsInternalServerError() {
        //arrange
        AchievementCustomException exception = new AchievementCustomException("Test error message");

        //act
        ResponseEntity<String> responseEntity = exceptionHandler.handleCustomException(exception);

        //assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }

    @Test
    void testHandleCustomException_ReturnsErrorMessageInResponseBody() {
        //arrange
        AchievementCustomException exception = new AchievementCustomException("Test error message");

        //act
        ResponseEntity<String> responseEntity = exceptionHandler.handleCustomException(exception);
        String responseBody = responseEntity.getBody();

        //assert
        assertEquals("Error: Test error message", responseBody);
    }
}
