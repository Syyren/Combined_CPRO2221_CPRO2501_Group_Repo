package com.brcg.coolcatgames.feature.hangman.model;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;
import java.util.stream.Stream;

public class Noun {
    private String noun;

    public String getNoun() {
        Path path = Paths.get("data/unique-noun-list.txt");
        try (Stream<String> lines = Files.lines(path);
             BufferedReader reader = new BufferedReader(Files.newBufferedReader(path))) {

            long totalLines = lines.count();
            Random random = new Random();
            int lineNumber = random.nextInt((int) totalLines) + 1;
            noun = reader.lines()
                    .skip(lineNumber - 1)
                    .findFirst()
                    .orElse(null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return noun;
    }
}
