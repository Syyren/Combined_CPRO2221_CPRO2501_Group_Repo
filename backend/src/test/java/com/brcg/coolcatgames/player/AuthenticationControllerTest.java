package com.brcg.coolcatgames.player;

import com.brcg.coolcatgames.config.JwtUtil;
import com.brcg.coolcatgames.feature.userRegistration.controller.AuthenticationController;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.naming.AuthenticationException;
import java.util.ArrayList;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AuthenticationControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtUtil jwtUtil;
    @MockBean
    private PlayerService playerService;

    @InjectMocks
    private AuthenticationController authenticationController;

    private MockMvc mockMvc;

    @Test
    public void testCreateAuthenticationToken_Success() throws Exception {
        Player loginRequest = new Player();
        loginRequest.setUsername("user");
        loginRequest.setPassword("password");

        String fakeToken = "fake-jwt-token";
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                "user", "password", new ArrayList<>()
        );
        String userId = "1";

        // Mocking the authentication process
        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("user", "password")))
                .thenReturn(new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));

        when(jwtUtil.generateToken(userDetails)).thenReturn(fakeToken);
        when(playerService.getUserIdByUsername("user")).thenReturn(userId);  // Corrected to return String

        // Set up the MVC environment
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();

        // Execute the test and validate responses
        mockMvc.perform(post("/api/players/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value(fakeToken))
                .andExpect(jsonPath("$.username").value("user"))
                .andExpect(jsonPath("$.userId").value(userId));

        // Verify the interactions
        verify(authenticationManager, times(1))
                .authenticate(new UsernamePasswordAuthenticationToken("user", "password"));
        verify(jwtUtil, times(1)).generateToken(userDetails);
        verify(playerService, times(1)).getUserIdByUsername("user");
    }
}
