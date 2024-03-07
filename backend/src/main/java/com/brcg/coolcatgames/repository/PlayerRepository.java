package com.brcg.coolcatgames.repository;

import com.brcg.coolcatgames.model.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlayerRepository extends MongoRepository <Player, String>{}

