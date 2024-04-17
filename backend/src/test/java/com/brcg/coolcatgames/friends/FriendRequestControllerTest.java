package com.brcg.coolcatgames.friends;


import com.brcg.coolcatgames.config.JwtUtil;
import com.brcg.coolcatgames.config.SecurityTestConfig;
import com.brcg.coolcatgames.config.TestConfig;
import com.brcg.coolcatgames.feature.arcadeshooter.controller.ArcadeShooterSessionController;
import com.brcg.coolcatgames.feature.arcadeshooter.service.ArcadeShooterSessionService;
import com.brcg.coolcatgames.feature.friends.controller.FriendRequestController;
import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import com.brcg.coolcatgames.feature.friends.service.FriendRequestService;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FriendRequestController.class)
@ExtendWith(SpringExtension.class)
@Import({TestConfig.class, SecurityTestConfig.class})
public class FriendRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private JwtUtil jwtUtil;

    @InjectMocks
    private FriendRequestController friendRequestController;

    @Captor
    private ArgumentCaptor<String> stringArgumentCaptor;

    @MockBean
    private FriendRequestService friendRequestService;

    @Test
    @WithMockUser
    public void testCreateFriendRequest_Success() throws Exception {
        FriendRequest input = new FriendRequest();
        input.setFromUserId("fromUserId");
        input.setToUserId("toUserId");
        input.setStatus("pending");

        FriendRequest created = new FriendRequest();
        created.setId("1");
        created.setFromUserId("fromUserId");
        created.setToUserId("toUserId");
        created.setStatus("pending");

        when(friendRequestService.createFriendRequest(any(FriendRequest.class))).thenReturn(created);

        mockMvc.perform(post("/api/friend-requests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"fromUserId\":\"fromUserId\",\"toUserId\":\"toUserId\",\"status\":\"pending\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.fromUserId").value("fromUserId"))
                .andExpect(jsonPath("$.toUserId").value("toUserId"))
                .andExpect(jsonPath("$.status").value("pending"));
    }

    @Test
    @WithMockUser
    public void testGetFriendRequestsByUserId_Success() throws Exception {
        List<FriendRequest> requests = new ArrayList<>();
        FriendRequest req1 = new FriendRequest();
        req1.setId("1");
        req1.setFromUserId("fromUserId");
        req1.setToUserId("userId");
        req1.setStatus("pending");
        requests.add(req1);

        FriendRequest req2 = new FriendRequest();
        req2.setId("2");
        req2.setFromUserId("anotherUserId");
        req2.setToUserId("userId");
        req2.setStatus("pending");
        requests.add(req2);

        when(friendRequestService.getFriendRequestsByUserId("userId")).thenReturn(requests);

        mockMvc.perform(get("/api/friend-requests/user/userId"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[1].id").value("2"));
    }

    @Test
    @WithMockUser
    public void testAcceptFriendRequest_Success() throws Exception {
        FriendRequest updated = new FriendRequest();
        updated.setId("1");
        updated.setFromUserId("fromUserId");
        updated.setToUserId("toUserId");
        updated.setStatus("accepted");

        when(friendRequestService.updateFriendRequestStatus("1", "accepted")).thenReturn(updated);

        mockMvc.perform(put("/api/friend-requests/1/accept"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.status").value("accepted"));
    }

    @Test
    @WithMockUser
    public void testDenyFriendRequest_Success() throws Exception {
        FriendRequest updated = new FriendRequest();
        updated.setId("1");
        updated.setFromUserId("fromUserId");
        updated.setToUserId("toUserId");
        updated.setStatus("declined");

        when(friendRequestService.updateFriendRequestStatus("1", "declined")).thenReturn(updated);

        mockMvc.perform(put("/api/friend-requests/1/deny"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.status").value("declined"));
    }

    @Test
    @WithMockUser
    public void testDeleteFriendRequest_Success() throws Exception {
        doNothing().when(friendRequestService).deleteFriendRequest("1");

        mockMvc.perform(delete("/api/friend-requests/1"))
                .andExpect(status().isNoContent());
    }
}
