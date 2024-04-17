package com.brcg.coolcatgames.friends;


import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import com.brcg.coolcatgames.feature.friends.repository.FriendRequestRepository;
import com.brcg.coolcatgames.feature.friends.service.FriendRequestService;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class FriendRequestServiceTest {

    @Mock
    private FriendRequestRepository friendRequestRepository;

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private FriendRequestService friendRequestService;

    private FriendRequest friendRequest;
    private Player playerFrom;
    private Player playerTo;

    @BeforeEach
    void setUp() {
        friendRequest = new FriendRequest();
        friendRequest.setId("1");
        friendRequest.setFromUserId("fromUserId");
        friendRequest.setToUserId("toUserId");
        friendRequest.setStatus("pending");

        playerFrom = new Player();
        playerFrom.setId("fromUserId");
        playerFrom.setFriends(new ArrayList<>());

        playerTo = new Player();
        playerTo.setId("toUserId");
        playerTo.setFriends(new ArrayList<>());
    }

    @Test
    void testCreateFriendRequest_Success() {
        when(friendRequestRepository.save(any(FriendRequest.class))).thenReturn(friendRequest);
        FriendRequest created = friendRequestService.createFriendRequest(friendRequest);
        assertNotNull(created);
        assertEquals("pending", created.getStatus());
        verify(friendRequestRepository).save(friendRequest);
    }

    @Test
    void testGetFriendRequestsByUserId_Success() {
        List<FriendRequest> requests = Arrays.asList(friendRequest);
        when(friendRequestRepository.findByToUserIdAndStatus("toUserId", "pending")).thenReturn(requests);
        List<FriendRequest> retrieved = friendRequestService.getFriendRequestsByUserId("toUserId");
        assertFalse(retrieved.isEmpty());
        assertEquals(1, retrieved.size());
        assertEquals("1", retrieved.get(0).getId());
    }

    @Test
    void testUpdateFriendRequestStatus_Success() {
        when(friendRequestRepository.findById("1")).thenReturn(Optional.of(friendRequest));
        when(playerRepository.findById("fromUserId")).thenReturn(Optional.of(playerFrom));
        when(playerRepository.findById("toUserId")).thenReturn(Optional.of(playerTo));
        when(friendRequestRepository.save(any(FriendRequest.class))).thenReturn(friendRequest);

        FriendRequest updated = friendRequestService.updateFriendRequestStatus("1", "accepted");
        assertNotNull(updated);
        assertEquals("accepted", updated.getStatus());
        assertTrue(playerFrom.getFriends().contains("toUserId"));
        assertTrue(playerTo.getFriends().contains("fromUserId"));
        verify(friendRequestRepository).save(friendRequest);
        verify(playerRepository).save(playerFrom);
        verify(playerRepository).save(playerTo);
    }

    @Test
    void testDeleteFriendRequest_Success() {
        doNothing().when(friendRequestRepository).deleteById("1");
        friendRequestService.deleteFriendRequest("1");
        verify(friendRequestRepository).deleteById("1");
    }

    @Test
    void testFriendRequestNotFound() {
        when(friendRequestRepository.findById("nonExistentId")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> friendRequestService.updateFriendRequestStatus("nonExistentId", "accepted"));
    }
}