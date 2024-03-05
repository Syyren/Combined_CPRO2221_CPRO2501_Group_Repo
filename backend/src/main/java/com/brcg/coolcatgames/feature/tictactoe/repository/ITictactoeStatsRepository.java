package com.brcg.coolcatgames.feature.tictactoe.repository;

import com.brcg.coolcatgames.feature.tictactoe.model.TictactoeStats;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITictactoeStatsRepository extends MongoRepository<TictactoeStats, String> {

    @Query("{_class: \"TictactoeStats\"}")
    List<TictactoeStats> findAllTictactoeStats();
}
