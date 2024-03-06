package com.brcg.coolcatgames.feature.leaderboard.service;


import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.repository.ScoreEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreEntryService {
    @Autowired
    ScoreEntryRepository repository;

    public List<ScoreEntry> getAllScores() {
        return repository.findAll();
    }
}
