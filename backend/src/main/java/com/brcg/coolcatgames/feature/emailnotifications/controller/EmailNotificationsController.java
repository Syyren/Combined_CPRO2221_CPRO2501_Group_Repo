package com.brcg.coolcatgames.feature.emailnotifications.controller;

import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.model.Scores;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;

import com.brcg.coolcatgames.feature.emailnotifications.service.EmailNotificationsService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Component
public class EmailNotificationsController {
    @Autowired
    private EmailNotificationsService emailService;
    @Autowired
    private PlayerService playerService;

    @Autowired
    private ScoreEntryService scoreEntryService;

    private Map<String,Integer> scoresInMemory = new HashMap<>();

    // This should run every 2 hours
    @Scheduled(fixedRate = 7200000)
    public void performTask() {
        Iterable<Player> users = playerService.listAll();
        // a variable to replace the scoresInMemory at the end of this function
        Map<String, Integer> newScoresInMemory = new HashMap<>();

        for (Player user: users) {
            // If any of the subloops adds to the email body, it will send this to true and send the email
            Boolean sendMail = false;
            // This is the opening of the email
            String EmailContent = "Dear " + user.getFirstName() +",\n\n";


            // Get all the scores of the user to get all the games they have played
            List<ScoreEntry> userScores = scoreEntryService.getScoresByUser(user.getId());
            List<ScoreEntry> allScores = scoreEntryService.getAllScores();
            for (ScoreEntry score :userScores) {
                if (scoresInMemory.containsKey(score.getGameName()+"_"+user.getId()) ) {
                    List<String> rivals = new ArrayList<>();
                    // See if the score has been beaten since last time it was checked
                    for (ScoreEntry score2 : allScores) {
                        if (score2.getGameName().equals(score.getGameName()) && !scoresInMemory.containsKey(score.getGameName()+"_"+score2.getUserId()) && score.getScore() < score2.getScore()) {
                            rivals.add(playerService.getPlayerByID(score2.getUserId()).getUsername());
                        }
                    }
                    if (rivals.size() > 0) {
                        for (String rival : rivals) {
                        EmailContent += rival + " has beaten your high score in"+ score.getGameName() +"\n";
                        sendMail = true;
                        }
                    }
                }
                newScoresInMemory.put(score.getGameName()+"_"+user.getId(),score.getScore());
            }

            // TODO make this a loop, replace False with a check if an achievement was gained
            if (false) {
                EmailContent += "You achieved x achievement!\n";
                sendMail = true;
            }
            // Send the email
            if (sendMail) {
                EmailContent += "\n\nThanks for being a part of CoolCatGames Community!";
                String subject = "test";
                emailService.sendEmail(user.getEmail(), subject,EmailContent);
            }
            scoresInMemory = newScoresInMemory;
        }

    }


}
