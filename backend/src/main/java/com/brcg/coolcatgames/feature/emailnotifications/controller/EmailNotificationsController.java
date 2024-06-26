package com.brcg.coolcatgames.feature.emailnotifications.controller;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import com.brcg.coolcatgames.feature.leaderboard.model.ScoreEntry;
import com.brcg.coolcatgames.feature.leaderboard.service.ScoreEntryService;
import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;

import com.brcg.coolcatgames.feature.emailnotifications.service.EmailNotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Component
public class EmailNotificationsController {
    // Link to each service that we want to email about
    @Autowired
    private EmailNotificationsService emailService = EmailNotificationsService.getInstance();
    @Autowired
    private PlayerService playerService;

    @Autowired
    private ScoreEntryService scoreEntryService;

    @Autowired
    private AchievementService achievementService;


    // Memory since last email
    private Map<String,Integer> scoresInMemory = new HashMap<>();
    private Map<String,ArrayList<Integer>> achievementsInMemory = new HashMap<>();

    // This should run every 12 hours
    // as long as fixedRate = 43200000
    @Scheduled(fixedRate = 43200000)
    public void performTask() {
        System.out.println("Starting email check");
        Iterable<Player> users = playerService.listAll();
        // a variable to replace the scoresInMemory at the end of this function
        Map<String, Integer> newScoresInMemory = new HashMap<>();
        // a variable to replace the achievementsInMemory at the end of this function
        Map<String,ArrayList<Integer>> newAchievementsInMemory = new HashMap<>();

        for (Player user: users) {
            //System.out.println("Checking email for user: " + user.getUsername());
            // If any of the subloops adds to the email body, it will send this to true and send the email
            Boolean sendMail = false;
            // This is the opening of the email
            String EmailContent = "Dear " + user.getFirstName() +",\n\n";


            // Get all the scores of the user to get all the games they have played
            List<ScoreEntry> userScores = scoreEntryService.getScoresByUser(user.getId());
            //System.out.println("UserId checked:"+user.getId());
            List<ScoreEntry> allScores = scoreEntryService.getAllScores();
            List<String> gamesChecked = new ArrayList<String>();
            for (ScoreEntry score :userScores) {
                if (!gamesChecked.contains(score.getGameName())) {
                    Boolean isHighestScore = true;
                    for (ScoreEntry score3 : userScores) {
                        if (score.getScore() < score3.getScore() && score.getGameName().equals(score3.getGameName())) {
                            isHighestScore = false;
                        }
                    }
                    if (isHighestScore) {
                        gamesChecked.add(score.getGameName());
                        String scoreKey = score.getGameName() + "_" + score.getUserId();
                        if (scoresInMemory.containsKey(scoreKey)) {
                            List<String> rivals = new ArrayList<>();
                            // See if the score has been beaten since last time it was checked
                            for (ScoreEntry score2 : allScores) {
                                String score2Key = score2.getGameName() + "_" + score2.getUserId();
                                //System.out.println("Testing if score was beaten");
                                if (score2.getGameName().equals(score.getGameName()) && ((!scoresInMemory.containsKey(score2Key)) || scoresInMemory.get(score2Key) < score2.getScore()) && score.getScore() < score2.getScore()) {
                                    try {
                                        //System.out.println("Adding "+playerService.getPlayerByID(score2.getUserId()).getUsername()+" to list of players who beat score");
                                        String rivalName = playerService.getPlayerByID(score2.getUserId()).getUsername();
                                        if (!rivals.contains(rivalName)) {
                                            rivals.add(rivalName);
                                            //System.out.println("Rival added");
                                        }
                                    } catch (Exception e) {
                                        System.out.println("Skipped score due to error:");
                                        System.out.println(e.toString());
                                    }
                                }
                            }
                            if (rivals.size() > 0) {
                                for (String rival : rivals) {
                                    EmailContent += rival + " has beaten your high score in " + score.getGameName() + "\n";
                                    sendMail = true;
                                }
                            }
                            if (scoresInMemory.get(scoreKey) < score.getScore()) {
                                newScoresInMemory.put(scoreKey, score.getScore());
                            }

                        } else {
                            newScoresInMemory.put(scoreKey, score.getScore());
                        }
                    }
                }
            }
            //System.out.println("Successfully checked scores");

            // Check if the user has gained a new achievement since the last email.
            List<Achievement> achievementList = achievementService.getAllAchievements();
            for(Achievement achievement: achievementList) {
                if (achievementsInMemory != null && achievementsInMemory.containsKey(user.getId())) {
                    try {
                        ArrayList<Integer> lastRememberedAchievements = achievementsInMemory.get(user.getId());
                        Integer achievementId = achievement.getAchievementId();
                        if (user.getAchievements().contains(achievementId) && !lastRememberedAchievements.contains(achievementId)) {
                            String achievementName = achievement.getAchievementTitle();
                            EmailContent += "You achieved the achievement "+achievementName+" since we last updated you!\n";
                            sendMail = true;
                        }
                    }
                    catch (Exception e) {
                        System.out.println("Failed to parse achievements due to error:");
                        System.out.println(e.toString());
                    }
                }

            }
            // Since the user information stores all the achievements they have, I don't need to store a key for each user and achievement
            newAchievementsInMemory.put(user.getId(),user.getAchievements());
            System.out.println("Checks for user "+user.getUsername()+" have completed, status of sendMail: "+sendMail);
            // Send the email
            if (sendMail) {
                try {
                    EmailContent += "\n\nThanks for being a part of CoolCatGames Community!";
                    String subject = "An update from CoolCatGames.com!";
                    emailService.sendEmail(user.getEmail(), subject, EmailContent);
                    wait(300000);
                }
                catch (Exception e) {
                    System.out.println(e);
                }
            }

        }
        scoresInMemory = newScoresInMemory;
        achievementsInMemory = newAchievementsInMemory;

    }


}
