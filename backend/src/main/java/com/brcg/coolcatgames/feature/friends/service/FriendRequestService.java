package com.brcg.coolcatgames.feature.friends.service;

import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import com.brcg.coolcatgames.feature.friends.repository.FriendRequestRepository;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final PlayerRepository playerRepository;

    // Creates a friend request
    public FriendRequest createFriendRequest(FriendRequest friendRequest) {
        return friendRequestRepository.save(friendRequest);
    }

    // Gets a users friend requests
    public List<FriendRequest> getFriendRequestsByUserId(String userId) {
        return friendRequestRepository.findByToUserIdAndStatus(userId, "pending");
    }

    // Updates a friend requests status
    public FriendRequest updateFriendRequestStatus(String id, String status) {
        Optional<FriendRequest> requestOptional = friendRequestRepository.findById(id);
        if (requestOptional.isPresent()) {
            FriendRequest friendRequest = requestOptional.get();
            friendRequest.setStatus(status);

            // Check if the status is "accepted" to update friends list
            if ("accepted".equals(status)) {
                Optional<Player> fromUser = playerRepository.findById(friendRequest.getFromUserId());
                Optional<Player> toUser = playerRepository.findById(friendRequest.getToUserId());

                if (fromUser.isPresent() && toUser.isPresent()) {
                    Player fromPlayer = fromUser.get();
                    Player toPlayer = toUser.get();

                    // Ensure the friends list for each user is not null
                    if (fromPlayer.getFriends() == null) {
                        fromPlayer.setFriends(new ArrayList<>()); // Initialize if null
                    }
                    if (toPlayer.getFriends() == null) {
                        toPlayer.setFriends(new ArrayList<>()); // Initialize if null
                    }

                    // Add each other to their friends list
                    fromPlayer.getFriends().add(toPlayer.getId());
                    toPlayer.getFriends().add(fromPlayer.getId());

                    // Save the updated player objects
                    playerRepository.save(fromPlayer);
                    playerRepository.save(toPlayer);
                }
            }
            return friendRequestRepository.save(friendRequest);
        } else {
            throw new RuntimeException("Friend request not found");
        }
    }

    // Deletes a friend request
    public void deleteFriendRequest(String id) {
        friendRequestRepository.deleteById(id);
    }
}