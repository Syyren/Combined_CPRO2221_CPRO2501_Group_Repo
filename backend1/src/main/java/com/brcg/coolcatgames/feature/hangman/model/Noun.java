package com.brcg.coolcatgames.feature.hangman.model;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;
import java.util.stream.Stream;


public class Noun {
    private static final Path NOUN_FILE_PATH = Paths.get("data/unique-noun-list.txt");
    public String getNoun() {
        try (Stream<String> lines = Files.lines(NOUN_FILE_PATH)){
            long totalLines = lines.count();
            Random random = new Random();
            int lineNumber = random.nextInt((int) totalLines) + 1;

            return Files.lines(NOUN_FILE_PATH)
                    .skip(lineNumber - 1)
                    .findFirst()
                    .orElse(null);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
