package com.brcg.coolcatgames.feature.hangman.controller;

import com.brcg.coolcatgames.feature.hangman.model.Hangman;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hangman")
public class HangmanController {
    private Hangman hangman;

    public HangmanController() {
        this.hangman = new Hangman();
    }

}
