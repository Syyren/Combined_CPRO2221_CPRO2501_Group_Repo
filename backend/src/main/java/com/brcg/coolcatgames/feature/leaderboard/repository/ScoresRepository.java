package com.brcg.coolcatgames.feature.leaderboard.repository;



import com.brcg.coolcatgames.feature.leaderboard.service.ScoresService;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "Scores")
// add in the abstract extension before the comma!!!!!!!!
public interface ScoresRepository extends MongoRepository<, Long> {
}
