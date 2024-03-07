package com.brcg.coolcatgames.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.brcg.coolcatgames")
public class DatabaseConnection extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.database}")
    private String database;

    @Value("${spring.data.mongodb.password}")
    private String password;

    @Value("${spring.data.mongodb.username}")
    private String username;

    @Override
    protected String getDatabaseName() {
        return database;
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb+srv://" + username + ":"+password+"@" + database +".ryd0b60.mongodb.net/?retryWrites=true&w=majority&appName=cool-cat-games");
    }
}
