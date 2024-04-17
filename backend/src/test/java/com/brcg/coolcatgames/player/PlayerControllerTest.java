package com.brcg.coolcatgames.player;


import com.brcg.coolcatgames.config.SecurityTestConfig;
import com.brcg.coolcatgames.config.TestConfig;
import com.brcg.coolcatgames.feature.userRegistration.controller.PlayerController;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PlayerController.class)
@ExtendWith(SpringExtension.class)
@Import({TestConfig.class, SecurityTestConfig.class})
public class PlayerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Captor
    private ArgumentCaptor<Player> mockPlayerCaptor;

    @Test
    @WithMockUser
    public void testRegisterPlayer_Success() throws Exception {
        Player mockPlayer = new Player();
        mockPlayer.setUsername("newUser");
        mockPlayer.setPassword("password123");
        String encodedPassword = "encodedPassword123";

        when(passwordEncoder.encode(mockPlayer.getPassword())).thenReturn(encodedPassword);
        doNothing().when(playerService).register(any(Player.class));

        mockMvc.perform(post("/api/players/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"newUser\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Player registered successfully with username: newUser")));

        verify(playerService).register(mockPlayerCaptor.capture());
        assertEquals(encodedPassword, mockPlayerCaptor.getValue().getPassword(), "Password encoding mismatch");
    }

    @Test
    @WithMockUser // Ensure the security context has a mock user
    public void testGetAllPlayers_Success() throws Exception {
        // Create a list of players to be returned by the mock service
        Player alice = new Player();
        alice.setUsername("Alice");

        Player bob = new Player();
        bob.setUsername("Bob");

        List<Player> players = Arrays.asList(alice, bob);
        when(playerService.listAll()).thenReturn(players);

        // Perform GET request and validate the response
        mockMvc.perform(get("/api/players/get/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.*", hasSize(2)))
                .andExpect(jsonPath("$[0].username", is("Alice")))
                .andExpect(jsonPath("$[1].username", is("Bob")));
    }

    @Test
    @WithMockUser
    public void testGetPlayerByUsername_Success() throws Exception {
        UserDetails mockUser = new org.springframework.security.core.userdetails.User(
                "Alice", "password", new ArrayList<>()
        );
        String username = "Alice";

        when(playerService.loadUserByUsername(username)).thenReturn(mockUser);

        mockMvc.perform(get("/api/players/username/{username}", username))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("Alice"));
    }

    @Test
    @WithMockUser
    public void testUpdatePlayer_Success() throws Exception {
        String playerId = "1";
        Player updatedPlayer = new Player();
        updatedPlayer.setUsername("updatedUser");
        updatedPlayer.setPassword("updatedPassword");

        when(playerService.updatePlayer(eq(playerId), any(Player.class))).thenReturn(updatedPlayer);

        mockMvc.perform(put("/api/players/update/{playerId}", playerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(updatedPlayer)))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Player with id " + playerId + " updated successfully.")));
    }

    @Test
    @WithMockUser
    public void testGiveAchievement_Success() throws Exception {
        String playerId = "1";
        int achievementId = 101;
        Player updatedPlayer = new Player();
        updatedPlayer.setUsername("existingUser");
        updatedPlayer.setPassword("password");

        when(playerService.addAchievement(playerId, achievementId)).thenReturn(updatedPlayer);

        mockMvc.perform(put("/api/players/give-achievement/{playerId}/{achievementId}", playerId, achievementId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Player with id " + playerId + " successfully given achievement: " + achievementId)));
    }

    @Test
    @WithMockUser
    public void testDeletePlayer_Success() throws Exception {
        String playerId = "1";

        doNothing().when(playerService).deletePlayer(playerId);

        mockMvc.perform(delete("/api/players/delete/{playerId}", playerId))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Player with id " + playerId + " deleted successfully.")));

        verify(playerService, times(1)).deletePlayer(playerId);
    }

    @Test
    @WithMockUser
    public void testGetPlayerById_Success() throws Exception {
        String playerId = "1";
        Player player = new Player();
        player.setUsername("testUser");
        player.setId(playerId);

        when(playerService.getPlayerByID(playerId)).thenReturn(player);

        mockMvc.perform(get("/api/players/get/{id}", playerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("testUser")))
                .andExpect(jsonPath("$.id", is(playerId)));

        verify(playerService, times(1)).getPlayerByID(playerId);
    }
}
