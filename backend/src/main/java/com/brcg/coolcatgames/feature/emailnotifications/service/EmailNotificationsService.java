package com.brcg.coolcatgames.feature.emailnotifications.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;


@Service
public class EmailNotificationsService {
    @Value("${spring.mail.host}")
    private String Host;
    @Value("${spring.mail.username}")
    private String Username;
    @Value("${spring.mail.password}")
    private String Password;
    @Value("${spring.mail.port}")
    private int port;
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();


        mailSender.setHost(Host);
        mailSender.setPort(port);

        mailSender.setUsername(Username);
        mailSender.setPassword(Password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
    private static  EmailNotificationsService instance;
    private EmailNotificationsService(){};

    public static EmailNotificationsService getInstance() {
        if (instance == null) {
            synchronized (EmailNotificationsService.class) {
                if (instance == null) {
                    instance = new EmailNotificationsService();
                }
            }
        }
        return instance;
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        getJavaMailSender().send(message);
    }
}
