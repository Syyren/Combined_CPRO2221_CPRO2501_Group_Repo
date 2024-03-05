package com.brcg.coolcatgames.feature.achievements.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

//using lombok to easily and cleanly construct my class
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Achievement
{
    @Id
    private int achievementID;
    private String achievementTitle;
    private String achievementDescription;
    private Date achievementEarnedDate;
    //foreign key for the game the achievement is from using the ID of the game
    private String gameName;
}