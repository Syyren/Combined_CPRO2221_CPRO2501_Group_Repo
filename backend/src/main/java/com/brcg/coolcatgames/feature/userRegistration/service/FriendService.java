package com.brcg.coolcatgames.feature.userRegistration.service;

import com.brcg.coolcatgames.feature.userRegistration.model.FriendDTO;
import com.brcg.coolcatgames.feature.userRegistration.model.Friend;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.repository.FriendRepository;
import com.brcg.coolcatgames.feature.userRegistration.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendService {
    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public List<FriendDTO> getFriendListWithDetails(String playerId) {
        List<FriendDTO> friendDTOList = new ArrayList<>();
        List<Friend> friends = friendRepository.findByPlayerIdAndStatus(playerId, "accepted");

        for (Friend friend : friends) {
            FriendDTO friendDTO = new FriendDTO();

            // Set friend-related data
            friendDTO.setPlayerId(playerId);
            friendDTO.setFriendId(friend.getFriendId());
            friendDTO.setStatus(friend.getStatus());

            // Fetch user details from PlayerRepository
            Player player = playerRepository.findById(friend.getFriendId()).orElse(null);
            if (player != null) {
                friendDTO.setUserName(player.getUsername());
                friendDTO.setFirstName(player.getFirstName());
                friendDTO.setEmail(player.getEmail()); // Assuming Player has an email field
            }

            friendDTOList.add(friendDTO);
        }

        return friendDTOList;
    }


    public void addFriend(String playerId, String friendId) {
        // Create a new Friend object
        Friend friend = new Friend();
        friend.setPlayerId(playerId);
        friend.setFriendId(friendId);
        friend.setStatus("accepted");

        // Save the Friend object to the MongoDB collection
        friendRepository.save(friend);
    }
}
