package com.brcg.coolcatgames.feature.arcadeShooter.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EndSessionRequest {
    private int finalScore;
    private int levelReached;
}
