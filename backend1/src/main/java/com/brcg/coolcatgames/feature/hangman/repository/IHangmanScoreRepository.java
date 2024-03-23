package com.brcg.coolcatgames.feature.hangman.repository;

import com.brcg.coolcatgames.feature.hangman.model.HangmanScore;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IHangmanScoreRepository extends MongoRepository<HangmanScore, String> {
}
