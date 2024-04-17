package com.brcg.coolcatgames.achievement_test;

import com.brcg.coolcatgames.feature.achievements.controller.AchievementController;
import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import com.brcg.coolcatgames.feature.achievements.repository.AchievementMongoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

public class AchievementControllerTest {
    @Mock
    private AchievementService achievementService;

    @InjectMocks
    private AchievementController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testCreateAchievement() {
        //arrange
        Achievement achievement = new Achievement();
        achievement.setAchievementId(1);
        achievement.setAchievementTitle("Test Achievement");

        when(achievementService.saveAchievement(any(Achievement.class))).thenReturn(achievement);

        //act
        Achievement createdAchievement = controller.createAchievement(achievement);

        //assert
        assertEquals(achievement, createdAchievement);
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

        when(achievementService.getAllAchievements()).thenReturn(mockAchievements);

        //act
        List<Achievement> retrievedAchievements = controller.getAllAchievements();

        //assert
        assertEquals(mockAchievements, retrievedAchievements);
    }

    @Test
    void testGetAchievementById() {
        //arrange
        int achievementId = 1;
        Achievement achievement = new Achievement();
        achievement.setAchievementId(achievementId);
        achievement.setAchievementTitle("Test Achievement");

        when(achievementService.getById(eq(achievementId))).thenReturn(achievement);

        //act
        Achievement retrievedAchievement = controller.getAchievementById(achievementId);

        //assert
        assertEquals(achievement, retrievedAchievement);
    }

    @Test
    void testUpdateAchievement() {
        //arrange
        int achievementId = 1;
        Achievement updatedAchievement = new Achievement();
        updatedAchievement.setAchievementId(achievementId);
        updatedAchievement.setAchievementTitle("Updated Achievement");

        when(achievementService.updateAchievement(eq(achievementId), any(Achievement.class)))
                .thenReturn(updatedAchievement);

        //act
        Achievement result = controller.updateAchievement(achievementId, updatedAchievement);

        //assert
        assertEquals(updatedAchievement, result);
    }



    @Test
    void testDeleteAchievement() {
        //arrange
        int achievementId = 1;
        Achievement achievement = new Achievement();
        achievement.setAchievementId(achievementId);
        achievement.setAchievementTitle("Test Achievement");

        when(achievementService.getById(eq(achievementId))).thenReturn(achievement);
        when(achievementService.delAchievement(eq(achievementId))).thenReturn("Deleted");

        //act
        String result = controller.deleteAchievement(achievementId);

        //assert
        assertEquals("Deleted", result);
    }
}