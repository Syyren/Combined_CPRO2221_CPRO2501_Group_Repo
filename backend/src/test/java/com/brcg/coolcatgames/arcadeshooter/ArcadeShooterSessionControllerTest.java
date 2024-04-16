package com.brcg.coolcatgames.arcadeshooter;

import com.brcg.coolcatgames.config.JwtUtil;
import com.brcg.coolcatgames.config.SecurityTestConfig;
import com.brcg.coolcatgames.config.TestConfig;
import com.brcg.coolcatgames.feature.arcadeshooter.controller.ArcadeShooterSessionController;
import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.model.EndSessionRequest;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ArcadeShooterSessionController.class)
@ExtendWith(SpringExtension.class)
@Import({TestConfig.class, SecurityTestConfig.class})
public class ArcadeShooterSessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArcadeShooterSessionService sessionService;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private JwtUtil jwtUtil;

    @InjectMocks
    private ArcadeShooterSessionController sessionController;

    @Captor
    private ArgumentCaptor<String> stringArgumentCaptor;

    @Test
    @WithMockUser
    public void testStartSession_Success() throws Exception {
        // Mocks ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setId("sessionId");
        mockedSession.setUserId("userId");
        when(sessionService.startSession(any(String.class))).thenReturn(mockedSession);

        // Performs POST request to start a new session
        mockMvc.perform(post("/api/arcadeshooter/sessions/start")
                        .param("userId", "testUserId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    @WithMockUser
    public void testStartSession_Failure_ReturnsNull() throws Exception {
        // Configures the service to return null indicating failure to start the session
        when(sessionService.startSession(any(String.class))).thenReturn(null);

        // Performs POST request to start a new session
        mockMvc.perform(post("/api/arcadeshooter/sessions/start")
                        .param("userId", "testUserId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void testEndSession_Success() throws Exception {
        // Mocks ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.endSession(any(String.class), any(Integer.class), any(Integer.class))).thenReturn(mockedSession);

        // Prepares endSession request body
        EndSessionRequest endSessionRequest = new EndSessionRequest();
        endSessionRequest.setFinalScore(100);
        endSessionRequest.setLevelReached(5);

        // Performs PUT request to end a session
        mockMvc.perform(put("/api/arcadeshooter/sessions/end/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"finalScore\":100,\"levelReached\":5}"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    @WithMockUser
    public void testEndSession_Failure_SessionNotFound() throws Exception {
        // Configures the service to return null indicating no session was ended
        when(sessionService.endSession(any(String.class), any(Integer.class), any(Integer.class))).thenReturn(null);

        // Prepares endSession request body
        EndSessionRequest endSessionRequest = new EndSessionRequest();
        endSessionRequest.setFinalScore(100);
        endSessionRequest.setLevelReached(5);

        // Performs PUT request to end a session
        mockMvc.perform(put("/api/arcadeshooter/sessions/end/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"finalScore\":100,\"levelReached\":5}"))
                .andExpect(status().isNotFound());  // Check for 404 status
    }

    @Test
    @WithMockUser
    public void testUpdateSession_Success() throws Exception {
        // Mock ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.updateSession(any(String.class), any(ArcadeShooterSession.class))).thenReturn(mockedSession);

        // Prepare request body for updating session
        ArcadeShooterSession updatedSession = new ArcadeShooterSession();
        mockedSession.setUserId("updatedUserId");
        mockedSession.setId("sessionId");

        // Perform PUT request to update a session
        mockMvc.perform(put("/api/arcadeshooter/sessions/update/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"sessionId\":\"sessionId\",\"userId\":\"updatedUserId\"}"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("updatedUserId"));
    }

    @Test
    @WithMockUser
    public void testUpdateSession_Failure_SessionNotFound() throws Exception {
        // Configures the service to return null indicating that the session could not be updated
        when(sessionService.updateSession(any(String.class), any(ArcadeShooterSession.class))).thenReturn(null);

        // Prepares request body for updating session
        ArcadeShooterSession sessionToUpdate = new ArcadeShooterSession();
        sessionToUpdate.setUserId("updatedUserId");
        sessionToUpdate.setId("sessionId");

        // Performs PUT request to update a session
        mockMvc.perform(put("/api/arcadeshooter/sessions/update/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"sessionId\":\"sessionId\",\"userId\":\"updatedUserId\"}"))
                .andExpect(status().isNotFound());  // Expect 404 Not Found if the session could not be updated
    }

    @Test
    @WithMockUser
    public void testGetSessionById_Success() throws Exception {
        // Mock ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.getSessionById(any(String.class))).thenReturn(mockedSession);

        // Perform GET request to retrieve a session by ID
        mockMvc.perform(get("/api/arcadeshooter/sessions/search/{id}", "sessionId"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    @WithMockUser
    public void testGetSessionById_Failure_SessionNotFound() throws Exception {
        // Configures the service to return null, simulating a scenario where no session is found
        when(sessionService.getSessionById(any(String.class))).thenReturn(null);

        // Performs GET request to retrieve a session by ID
        mockMvc.perform(get("/api/arcadeshooter/sessions/search/{id}", "nonExistentSessionId"))
                .andExpect(status().isNotFound());  // Expect 404 Not Found if the session cannot be found
    }

    @Test
    @WithMockUser
    public void testGetSessionsByUserId_Success() throws Exception {
        // Mock list of ArcadeShooterSession returned by the service
        ArcadeShooterSession session1 = new ArcadeShooterSession();
        session1.setUserId("userId");
        session1.setId("sessionId1");
        ArcadeShooterSession session2 = new ArcadeShooterSession();
        session2.setUserId("userId");
        session2.setId("sessionId2");
        List<ArcadeShooterSession> sessions = Arrays.asList(session1, session2);
        when(sessionService.getSessionsByUserId(any(String.class))).thenReturn(sessions);

        // Perform GET request to retrieve sessions by user ID
        mockMvc.perform(get("/api/arcadeshooter/sessions/search/user/{userId}", "userId"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("sessionId1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userId").value("userId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value("sessionId2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].userId").value("userId"));
    }

    @Test
    @WithMockUser
    public void testGetSessionsByUserId_Failure_NoSessionsFound() throws Exception {
        // Configures the service to return an empty list, simulating a scenario where no sessions are found
        when(sessionService.getSessionsByUserId(any(String.class))).thenReturn(Collections.emptyList());

        // Performs GET request to retrieve sessions by user ID
        mockMvc.perform(get("/api/arcadeshooter/sessions/search/user/{userId}", "nonExistentUserId"))
                .andExpect(status().isNotFound());  // Expect 404 Not Found if no sessions are found
    }

    @Test
    @WithMockUser
    public void testDeleteSession_Success() throws Exception {
        // Mock the behavior of the service to return true when deleteSession is called
        when(sessionService.deleteSession(any(String.class))).thenReturn(true);

        // Perform DELETE request to delete a session by ID
        mockMvc.perform(delete("/api/arcadeshooter/sessions/delete/{id}", "sessionId"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testDeleteSession_Failure_SessionNotFound() throws Exception {
        // Configures the service to return false indicating that the session could not be deleted
        when(sessionService.deleteSession(any(String.class))).thenReturn(false);

        // Performs DELETE request to delete a session by ID
        mockMvc.perform(delete("/api/arcadeshooter/sessions/delete/{id}", "nonExistentSessionId"))
                .andExpect(status().isNotFound());  // Expect 404 Not Found if the session cannot be deleted
    }
}
