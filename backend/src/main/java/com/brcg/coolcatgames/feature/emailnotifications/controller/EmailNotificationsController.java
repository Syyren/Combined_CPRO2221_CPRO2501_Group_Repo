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
            List<ScoreEntry> scores = scoreEntryService.getScoresByUser(user.getId());
            for (ScoreEntry score :scores) {
                if (scoresInMemory.containsKey(score.getGameName()+"_"+user.getId()) ) {
                    // TODO replace False with an actual check if a score has been beaten since last time this was checked.

                    if (false) {
                        EmailContent += "x has beaten your high score in y\n";
                        sendMail = true;
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
