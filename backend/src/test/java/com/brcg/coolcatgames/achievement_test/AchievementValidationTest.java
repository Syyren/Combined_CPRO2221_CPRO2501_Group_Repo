package com.brcg.coolcatgames.achievement_test;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementCustomException;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementValidation;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class AchievementValidationTest {

    @Test
    void testString_WhenStringIsNotNullOrEmpty_ShouldNotThrowException() {
        //arrange
        AchievementValidation validation = new AchievementValidation();

        //act & assert
        assertDoesNotThrow(() -> validation.String("Test", "Some value"));
    }

    @Test
    void testString_WhenStringIsNull_ShouldThrowException() {
        //arrange
        AchievementValidation validation = new AchievementValidation();

        //act & assert
        assertThrows(AchievementCustomException.class,
                () -> validation.String("Test", null),
                "Expected string validation to throw AchievementCustomException");
    }

    @Test
    void testString_WhenStringIsEmpty_ShouldThrowException() {
        //arrange
        AchievementValidation validation = new AchievementValidation();

        //act & assert
        assertThrows(AchievementCustomException.class,
                () -> validation.String("Test", ""),
                "Expected string validation to throw AchievementCustomException");
    }

    @Test
    void testAchievement_WhenAchievementIsNotNull_ShouldNotThrowException() {
        //arrange
        AchievementValidation validation = new AchievementValidation();
        Achievement achievement = new Achievement();

        //act & assert
        assertDoesNotThrow(() -> validation.Achievement(achievement, 1));
    }

    @Test
    void testAchievement_WhenAchievementIsNull_ShouldThrowException() {
        //arrange
        AchievementValidation validation = new AchievementValidation();

        //act & assert
        assertThrows(AchievementCustomException.class,
                () -> validation.Achievement(null, 1),
                "Expected achievement validation to throw AchievementCustomException");
    }
}