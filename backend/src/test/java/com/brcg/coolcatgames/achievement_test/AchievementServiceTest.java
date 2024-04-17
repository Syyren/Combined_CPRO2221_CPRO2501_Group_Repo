package com.brcg.coolcatgames.achievement_test;

import com.brcg.coolcatgames.feature.achievements.utils.AchievementCustomException;
import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.repository.AchievementRepository;
import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

public class AchievementServiceTest {
    @Mock
    private AchievementRepository achievementRepository;

    @InjectMocks
    private AchievementService achievementService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveAchievement() {
        //arrange
        Achievement achievement = new Achievement();
        achievement.setAchievementId(1);
        achievement.setAchievementTitle("Test Achievement");

        when(achievementRepository.save(any(Achievement.class)))
                .thenReturn(achievement);

        //act
        Achievement savedAchievement = achievementService.saveAchievement(achievement);

        //assert
        assertEquals(achievement, savedAchievement);
    }

    @Test
    void testUpdateAchievement() {
        //arrange
        int achievementId = 1;
        Achievement updatedAchievement = new Achievement();
        updatedAchievement.setAchievementId(achievementId);
        updatedAchievement.setAchievementTitle("Updated Achievement");

        when(achievementRepository.update(eq(achievementId), any(Achievement.class)))
                .thenReturn(updatedAchievement);

        //act
        Achievement result = achievementService.updateAchievement(achievementId, updatedAchievement);

        //assert
        assertEquals(updatedAchievement, result);
    }

    @Test
    void testDelAchievement() {
        //arrange
        int achievementId = 1;

        when(achievementRepository.delete(eq(achievementId)))
                .thenReturn("Deleted");

        //act
        String result = achievementService.delAchievement(achievementId);

        //assert
        assertEquals("Deleted", result);
    }

    @Test
    void testGetById() {
        //arrange
        int achievementId = 1;
        Achievement achievement = new Achievement();
        achievement.setAchievementId(achievementId);
        achievement.setAchievementTitle("Test Achievement");

        when(achievementRepository.findById(eq(achievementId)))
                .thenReturn(achievement);

        //act
        Achievement retrievedAchievement = achievementService.getById(achievementId);

        //assert
        assertEquals(achievement, retrievedAchievement);
    }

    @Test
    void testGetAllAchievements() {
        //arrange
        Achievement achievement1 = new Achievement();
        achievement1.setAchievementId(1);
        achievement1.setAchievementTitle("Achievement 1");

        Achievement achievement2 = new Achievement();
        achievement2.setAchievementId(2);
        achievement2.setAchievementTitle("Achievement 2");

        List<Achievement> mockAchievements = Arrays.asList(achievement1, achievement2);

        when(achievementRepository.getAllAchievements())
                .thenReturn(mockAchievements);

        //act
        List<Achievement> retrievedAchievements = achievementService.getAllAchievements();

        //assert
        assertEquals(mockAchievements, retrievedAchievements);
    }
}