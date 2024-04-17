package com.brcg.coolcatgames.player;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;

    @Mock
    private AchievementService achievementService;

    @InjectMocks
    private PlayerService playerService;

    private Player player;

    @BeforeEach
    public void setUp() {
        player = new Player();
        player.setId("1");
        player.setUsername("user");
        player.setPassword("password");
        player.setAchievements(new ArrayList<>(Arrays.asList(1001)));
    }

    @Test
    public void testRegister_Success() throws Exception {
        Player player = new Player();
        player.setUsername("newUser");
        player.setPassword("password123");
        when(playerRepository.save(any(Player.class))).thenReturn(null);
        playerService.register(player);
        verify(playerRepository).save(player);
    }

    @Test
    public void testListAll_Success() {
        when(playerRepository.findAll()).thenReturn(Arrays.asList(player));
        Iterable<Player> result = playerService.listAll();
        assertNotNull(result);
        assertTrue(result.iterator().hasNext());
        assertEquals(player, result.iterator().next());
    }

    @Test
    public void testDeletePlayer_Success() {
        doNothing().when(playerRepository).deleteById("1");
        playerService.deletePlayer("1");
        verify(playerRepository).deleteById("1");
    }

    @Test
    public void testGetPlayerByID_Success() {
        when(playerRepository.findById("1")).thenReturn(Optional.of(player));
        Player result = playerService.getPlayerByID("1");
        assertNotNull(result);
        assertEquals("user", result.getUsername());
    }

    @Test
    public void testLoadUserByUsername_Success() {
        when(playerRepository.findByUsername("user")).thenReturn(player);
        assertNotNull(playerService.loadUserByUsername("user"));
    }

    @Test
    public void testGetUserIdByUsername_Success() {
        when(playerRepository.findByUsername("user")).thenReturn(player);
        assertEquals("1", playerService.getUserIdByUsername("user"));
    }

    @Test
    public void testAddAchievement_Success() {
        when(playerRepository.findById("1")).thenReturn(Optional.of(player));
        Achievement newAchievement = new Achievement();
        newAchievement.setAchievementId(1002);
        newAchievement.setAchievementTitle("New Achievement");
        when(achievementService.getById(1002)).thenReturn(newAchievement);
        when(playerRepository.save(player)).thenReturn(player);

        Player result = playerService.addAchievement("1", 1002);
        assertNotNull(result);
        assertTrue(result.getAchievements().contains(1002)); // Assuming achievements are stored as a list of IDs
        verify(playerRepository).save(player);
    }

    @Test
    public void testUpdatePlayer_Success() {
        Player updatedPlayer = new Player();
        updatedPlayer.setFirstName("Updated");
        when(playerRepository.findById("1")).thenReturn(Optional.of(player));
        when(playerRepository.save(player)).thenReturn(player);
        assertNotNull(playerService.updatePlayer("1", updatedPlayer));
        assertEquals("Updated", player.getFirstName());
        verify(playerRepository).save(player);
    }
}
