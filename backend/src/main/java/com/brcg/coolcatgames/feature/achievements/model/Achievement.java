package com.brcg.coolcatgames.feature.achievements.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//using lombok to easily and cleanly construct my class
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "achievements")
public class Achievement
{
    @Id
    private int achievementId;
    private String achievementTitle;
    private String achievementDescription;
    //foreign key for the game the achievement is from using the ID of the game
    private String gameName;
}