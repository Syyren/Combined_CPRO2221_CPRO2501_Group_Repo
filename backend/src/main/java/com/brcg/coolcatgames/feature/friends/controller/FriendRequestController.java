package com.brcg.coolcatgames.feature.friends.controller;

import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import com.brcg.coolcatgames.feature.friends.service.FriendRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;


/**
 * Controller class for managing friend requests.
 */
@RestController
@RequestMapping("/api/friend-requests")
@RequiredArgsConstructor
public class FriendRequestController {

    private final FriendRequestService friendRequestService;

    /**
     * Create a new friend request.
     *
     * @param friendRequest the friend request to create
     * @return the created friend request
     */
    @PostMapping
    public ResponseEntity<FriendRequest> createFriendRequest(@RequestBody FriendRequest friendRequest) {
        friendRequest.setStatus("pending");
        FriendRequest created = friendRequestService.createFriendRequest(friendRequest);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Get all friend requests for a user.
     *
     * @param userId the ID of the user
     * @return a list of friend requests for the user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FriendRequest>> getFriendRequestsByUserId(@PathVariable String userId) {
        List<FriendRequest> requests = friendRequestService.getFriendRequestsByUserId(userId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    /**
     * Accept a friend request.
     *
     * @param id the ID of the friend request to accept
     * @return the updated friend request
     */
    @PutMapping("/{id}/accept")
    public ResponseEntity<FriendRequest> acceptFriendRequest(@PathVariable String id) {
        FriendRequest updated = friendRequestService.updateFriendRequestStatus(id, "accepted");
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    /**
     * Deny a friend request.
     *
     * @param id the ID of the friend request to deny
     * @return the updated friend request
     */
    @PutMapping("/{id}/deny")
    public ResponseEntity<FriendRequest> denyFriendRequest(@PathVariable String id) {
        FriendRequest updated = friendRequestService.updateFriendRequestStatus(id, "declined");
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    /**
     * Delete a friend request.
     *
     * @param id the ID of the friend request to delete
     * @return HTTP status indicating success or failure
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFriendRequest(@PathVariable String id) {
        friendRequestService.deleteFriendRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}