package com.brcg.coolcatgames.feature.emailnotifications.controller;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;

import com.brcg.coolcatgames.feature.emailnotifications.service.EmailNotificationsService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class EmailNotificationsController {
    @Autowired
    private EmailNotificationsService emailService;
    @Autowired
    private PlayerService playerService;

    // This should run every 2 hours
    @Scheduled(fixedRate = 7200000)
    public void performTask() {
        Iterable<Player> users = playerService.listAll();

        for (Player user: users) {
            Boolean sendMail = false;
            String EmailContent = "Dear " + user.getFirstName() +",\n\n";

            // TODO replace false with a way to detect if there's changes in one of the database schemas
            if (false) {
                EmailContent += "x has beaten your high score in y\n";
                sendMail = true;
            }
            if (false) {
                EmailContent += "";
                sendMail = true;
            }

            if (sendMail) {
                EmailContent += "\n\nThanks for being a part of CoolCatGames Community!";
                String subject = "test";
                emailService.sendEmail(user.getEmail(), subject,EmailContent);
            }
        }

    }


}
