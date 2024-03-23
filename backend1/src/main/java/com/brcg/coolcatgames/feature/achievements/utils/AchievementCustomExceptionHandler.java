package com.brcg.coolcatgames.feature.achievements.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//Creating a handler that runs across the entire application
@ControllerAdvice
public class AchievementCustomExceptionHandler
{
    @ExceptionHandler(AchievementCustomException.class)
    //returning a response entity for the client to receive an error message
    public ResponseEntity<String> handleCustomException(AchievementCustomException exception)
    {
        String message = "Error: " + exception.getMessage();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}