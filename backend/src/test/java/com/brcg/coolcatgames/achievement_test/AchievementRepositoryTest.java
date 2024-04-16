package com.brcg.coolcatgames.achievement_test;

import com.brcg.coolcatgames.feature.achievements.utils.AchievementCustomException;
import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.repository.AchievementMongoRepository;
import com.brcg.coolcatgames.feature.achievements.repository.AchievementRepository;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementValidation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

public class AchievementRepositoryTest {

    @Mock
    private AchievementMongoRepository mongoRepository;

    @Mock
    private AchievementValidation achievementValidation;

    @InjectMocks
    private AchievementRepository achievementRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindById_WhenAchievementFound_ShouldReturnAchievement() {
        //arrange
        int achievementId = 1;
        Achievement achievement = new Achievement();
        achievement.setAchievementId(achievementId);
        when(mongoRepository.findById(eq(achievementId))).thenReturn(Optional.of(achievement));

        //act
        Achievement result = achievementRepository.findById(achievementId);

        //assert
        assertEquals(achievement, result);
    }

    @Test
    void testFindById_WhenAchievementNotFound_ShouldThrowException() {
        //arrange
        int nonExistingId = 100;
        when(mongoRepository.findById(eq(nonExistingId))).thenReturn(Optional.empty());

        //act & assert
        assertThrows(AchievementCustomException.class,
                () -> achievementRepository.findById(nonExistingId),
                "Expected findById to throw AchievementCustomException");
    }

    @Test
    void testFindAll_MultipleAchievements_ShouldReturnAchievementsList() {
        //arrange
        Achievement achievement1 = new Achievement();
        achievement1.setAchievementId(1);
        achievement1.setAchievementTitle("Achievement 1");

        Achievement achievement2 = new Achievement();
        achievement2.setAchievementId(2);
        achievement2.setAchievementTitle("Achievement 2");

        List<Achievement> mockAchievements = Arrays.asList(achievement1, achievement2);

        when(mongoRepository.findAll()).thenReturn(mockAchievements);

        //act
        List<Achievement> result = achievementRepository.getAllAchievements();

        //assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(achievement1, result.get(0));
        assertEquals(achievement2, result.get(1));
    }

    @Test
    void testFindAll_NoAchievements_ShouldReturnEmptyList() {
        //arrange
        when(mongoRepository.findAll()).thenReturn(Collections.emptyList());

        //act
        List<Achievement> result = achievementRepository.getAllAchievements();

        //assert
        assertTrue(result.isEmpty());
    }

    @Test
    void testSave_ValidAchievement_ShouldReturnSavedAchievement() {
        //arrange
        Achievement achievementToSave = new Achievement();
        achievementToSave.setAchievementTitle("Test Title");
        achievementToSave.setAchievementDescription("Test Description");

        Achievement savedAchievement = new Achievement();
        savedAchievement.setAchievementId(1);
        savedAchievement.setAchievementTitle("Test Title");
        savedAchievement.setAchievementDescription("Test Description");

        when(mongoRepository.save(any(Achievement.class))).thenReturn(savedAchievement);

        //act
        Achievement result = achievementRepository.save(achievementToSave);

        //assert
        assertEquals(savedAchievement, result);
    }

    @Test
    void testUpdate_ValidAchievement_ShouldReturnUpdatedAchievement() {
        //arrange
        int achievementId = 1;
        Achievement existingAchievement = new Achievement();
        existingAchievement.setAchievementId(achievementId);
        existingAchievement.setAchievementTitle("Existing Title");
        existingAchievement.setAchievementDescription("Existing Description");

        Achievement updatedAchievement = new Achievement();
        updatedAchievement.setAchievementId(achievementId);
        updatedAchievement.setAchievementTitle("Updated Title");
        updatedAchievement.setAchievementDescription("Updated Description");

        when(mongoRepository.findById(eq(achievementId))).thenReturn(Optional.of(existingAchievement));
        when(mongoRepository.save(any(Achievement.class))).thenReturn(updatedAchievement);

        //act
        Achievement result = achievementRepository.update(achievementId, updatedAchievement);

        //assert
        assertEquals(updatedAchievement, result);
    }

    @Test
    void testDelete_ValidAchievement_ShouldReturnSuccessMessage() {
        //arrange
        int achievementId = 1;
        Achievement existingAchievement = new Achievement();
        existingAchievement.setAchievementId(achievementId);
        existingAchievement.setAchievementTitle("Existing Title");
        existingAchievement.setAchievementDescription("Existing Description");

        when(mongoRepository.findById(eq(achievementId))).thenReturn(Optional.of(existingAchievement));

        //act
        String result = achievementRepository.delete(achievementId);

        //assert
        assertEquals("Achievement with id: " + achievementId + " removed successfully.", result);
    }

}
