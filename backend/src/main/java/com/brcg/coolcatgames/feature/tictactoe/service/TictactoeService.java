package com.brcg.coolcatgames.feature.tictactoe.service;

import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import com.brcg.coolcatgames.feature.tictactoe.repository.ITictactoeStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TictactoeService {
    @Autowired
    ITictactoeStats repository;

    public List<TictactoeStats> getAllScores() {
        return repository.findAll();
    }

}
