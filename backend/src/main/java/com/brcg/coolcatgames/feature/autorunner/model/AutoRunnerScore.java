package com.brcg.coolcatgames.feature.autorunner.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutoRunnerScore
{
    private String userId;
    private int score;
}
