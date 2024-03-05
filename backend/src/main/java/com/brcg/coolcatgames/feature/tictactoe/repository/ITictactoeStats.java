package com.brcg.coolcatgames.feature.tictactoe.repository;

import com.brcg.coolcatgames.feature.tictactoe.model.GameInProgress;
import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "Scores")
public interface ITictactoeStats  extends MongoRepository<TictactoeStats, Long> {
}
