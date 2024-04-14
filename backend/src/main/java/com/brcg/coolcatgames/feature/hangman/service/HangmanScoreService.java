package com.brcg.coolcatgames.feature.hangman.service;

import com.brcg.coolcatgames.feature.hangman.model.HangmanScore;
import com.brcg.coolcatgames.feature.hangman.repository.IHangmanScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HangmanScoreService {

    private final HangmanScore hangmanScore;
    private final IHangmanScoreRepository hangmanScoreRepository;

    @Autowired
    public HangmanScoreService(HangmanScore hangmanScore, IHangmanScoreRepository hangmanScoreRepository) {
        this.hangmanScore = hangmanScore;
        this.hangmanScoreRepository = hangmanScoreRepository;
    }

    public int getCurrentScore() {
        return hangmanScore.getScore();
    }
    
    public void updateScore(int points) {
        hangmanScore.updateScore(points);
    }

    public void resetScore() {
        hangmanScore.resetScore();
    }

    //method saves current score to MongoDB
    public void saveScore(HangmanScore hangmanScore) {
        //temp test
        hangmanScore.setGameName("test");
        hangmanScoreRepository.save(hangmanScore);
    }
}
