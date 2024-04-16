package com.brcg.coolcatgames.feature.friends.repository;

import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    List<FriendRequest> findByToUserIdAndStatus(String toUserId, String status);
}
