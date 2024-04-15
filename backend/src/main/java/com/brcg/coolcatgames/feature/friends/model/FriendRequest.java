package com.brcg.coolcatgames.feature.friends.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "friend_requests")
public class FriendRequest {
    @Id
    private String id;
    private String fromUserId;
    private String toUserId;
    private String status;
}
