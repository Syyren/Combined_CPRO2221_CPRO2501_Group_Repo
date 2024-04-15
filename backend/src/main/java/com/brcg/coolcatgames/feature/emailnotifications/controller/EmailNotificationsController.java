package com.brcg.coolcatgames.feature.emailnotifications.controller;

import com.brcg.coolcatgames.feature.emailnotifications.service.EmailNotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationsController {
    @Autowired
    private EmailNotificationsService emailService;

    // This should run every hour
    @Scheduled(cron="O O * * * *")
    public void performTask() {
        // TODO replace false with a way to detect if there's changes in one of the database schemas
        if (false) {
            String user;
            String subject;
            emailService.sendEmail(user, subject,"");
        }
    }


}
