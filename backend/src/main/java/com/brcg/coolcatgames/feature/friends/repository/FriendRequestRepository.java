package com.brcg.coolcatgames.feature.friends.repository;

import com.brcg.coolcatgames.feature.friends.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing friend requests in the database.
 */
@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {

    /**
     * Find friend requests by the recipient user ID and status.
     *
     * @param toUserId the recipient user ID
     * @param status   the status of the friend requests
     * @return a list of friend requests matching the criteria
     */
    List<FriendRequest> findByToUserIdAndStatus(String toUserId, String status);
}