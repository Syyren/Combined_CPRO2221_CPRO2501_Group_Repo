package com.brcg.coolcatgames.feature.achievements.utils;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;

import java.util.List;

public class AchievementValidation
{

    public void String(String stringName, String stringContent)
    {
        if (stringContent == null || stringContent.isEmpty())
        { throw new AchievementCustomException(stringName + " cannot be null or empty!"); }
    }

    public void List(List<Achievement> list)
    {
        if (list.isEmpty())
        { throw new AchievementCustomException("No achievements in the database!"); }
    }

    public void Achievement(Achievement achievement, int id)
    {
        if(achievement == null)
        { throw new AchievementCustomException("Achievement not found with id: " + id); }
    }
}
