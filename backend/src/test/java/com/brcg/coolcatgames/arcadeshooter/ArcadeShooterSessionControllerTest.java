package com.brcg.coolcatgames.arcadeshooter;

import com.brcg.coolcatgames.feature.arcadeshooter.controller.ArcadeShooterSessionController;
import com.brcg.coolcatgames.feature.arcadeshooter.model.ArcadeShooterSession;
import com.brcg.coolcatgames.feature.arcadeshooter.model.EndSessionRequest;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ArcadeShooterSessionController.class)
public class ArcadeShooterSessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ArcadeShooterSessionService sessionService;

    @MockBean
    private PlayerService playerService;

    @InjectMocks
    private ArcadeShooterSessionController sessionController;

    @Captor
    private ArgumentCaptor<String> stringArgumentCaptor;

    @Test
    public void testStartSession() throws Exception {
        // Mock ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.startSession(any(String.class))).thenReturn(mockedSession);

        // Perform POST request to start a new session
        mockMvc.perform(MockMvcRequestBuilders.post("/api/arcadeshooter/sessions/start")
                        .param("userId", "testUserId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.sessionId").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    public void testEndSession() throws Exception {
        // Mock ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.endSession(any(String.class), any(Integer.class), any(Integer.class))).thenReturn(mockedSession);

        // Prepare endSession request body
        EndSessionRequest endSessionRequest = new EndSessionRequest();
        endSessionRequest.setFinalScore(100);
        endSessionRequest.setLevelReached(5);

        // Perform PUT request to end a session
        mockMvc.perform(MockMvcRequestBuilders.put("/api/arcadeshooter/sessions/end/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"finalScore\":100,\"levelReached\":5}"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.sessionId").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    public void testUpdateSession() throws Exception {
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
        mockMvc.perform(MockMvcRequestBuilders.put("/api/arcadeshooter/sessions/update/{id}", "sessionId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"sessionId\":\"sessionId\",\"userId\":\"updatedUserId\"}"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.sessionId").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("updatedUserId"));
    }

    @Test
    public void testGetSessionById() throws Exception {
        // Mock ArcadeShooterSession returned by the service
        ArcadeShooterSession mockedSession = new ArcadeShooterSession();
        mockedSession.setUserId("userId");
        mockedSession.setId("sessionId");
        when(sessionService.getSessionById(any(String.class))).thenReturn(mockedSession);

        // Perform GET request to retrieve a session by ID
        mockMvc.perform(MockMvcRequestBuilders.get("/api/arcadeshooter/sessions/search/{id}", "sessionId"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.sessionId").value("sessionId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"));
    }

    @Test
    public void testGetSessionsByUserId() throws Exception {
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
        mockMvc.perform(MockMvcRequestBuilders.get("/api/arcadeshooter/sessions/search/user/{userId}", "userId"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].sessionId").value("sessionId1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userId").value("userId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].sessionId").value("sessionId2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].userId").value("userId"));
    }

    @Test
    public void testDeleteSession() throws Exception {
        // Mock the behavior of the service to return true when deleteSession is called
        when(sessionService.deleteSession(any(String.class))).thenReturn(true);

        // Perform DELETE request to delete a session by ID
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/arcadeshooter/sessions/delete/{id}", "sessionId"))
                .andExpect(status().isOk());
    }
}
