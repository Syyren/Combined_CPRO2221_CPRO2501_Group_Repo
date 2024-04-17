package com.brcg.coolcatgames.feature.arcadeshooter.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Model class representing a request to end an arcade shooter session.
 */
@Getter
@Setter
@NoArgsConstructor
public class EndSessionRequest {
    private int finalScore;
    private int levelReached;
}
