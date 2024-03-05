package com.brcg.coolcatgames.feature.achievements.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//using lombok to easily and cleanly construct my class
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Achievement
{
    @Id
    private int AchievementID;
    private String AchievementTitle;
    private String AchievementDescription;
    //foreign key for the game the achievement is from using the ID of the game
    private int GameID;
}
