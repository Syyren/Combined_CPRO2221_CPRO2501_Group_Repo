package com.brcg.coolcatgames.feature.emailnotifications.controller;

import com.brcg.coolcatgames.feature.userRegistration.model.Player;
import com.brcg.coolcatgames.feature.userRegistration.service.PlayerService;

import com.brcg.coolcatgames.feature.emailnotifications.service.EmailNotificationsService;
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

    // This should run every hour
    @Scheduled(fixedRate = 3600000)
    public void performTask() {
        Iterable<Player> users = playerService.listAll();

        for (Player user: users) {
            // TODO replace false with a way to detect if there's changes in one of the database schemas
            if (false) {
                String subject = "test";
                emailService.sendEmail(user.getEmail(), subject,"test");
            }
        }

    }


}
