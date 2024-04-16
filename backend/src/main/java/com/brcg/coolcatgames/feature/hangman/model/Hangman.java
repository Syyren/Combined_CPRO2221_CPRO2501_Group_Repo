package com.brcg.coolcatgames.feature.hangman.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class Hangman {
    private char[] secretWord;
    private char[] displayedWord;
    private char letterGuessed;
    private HangmanScore score = new HangmanScore();
    private List<Character> lettersGuessed;

    private boolean again;
    private String gameStatus;

    //game values
    private int guesses = 8;
    private int scoreOnGuess = 5;
    private int scoreOnWin = 50;
    private final int flawless = guesses;

    //constructor
    public Hangman(){
        this.lettersGuessed = new ArrayList<>();
        getSecretWord();
        setDisplayedWord();
    }

    //using Noun class to generate secret word
    private char[] getSecretWord(){
        Noun noun = new Noun();
        String randomNoun = noun.getNoun().toUpperCase();
        return this.secretWord = randomNoun.toCharArray();
    }

    //generates displayed word based off of secret word obtained
    public void setDisplayedWord() {
        System.out.println("s word: "+ Arrays.toString(this.secretWord));
        int secretWordLength = secretWord.length;
        displayedWord = new char[secretWordLength];
        //adds an underscore for every letter, adds any non letters as their own chars. ie: hyphens and spaces persist
        for (int i = 0; i < secretWord.length; i++) {
            char letter = secretWord[i];
            if (Character.isLetter(letter)){
                displayedWord[i] = '_';
            } else {
                displayedWord[i] = letter;
            }
        }
    }

    //handles logic upon picking letter
    public void guessLetter(char letterGuessed){
        if (letterInSecretWord(letterGuessed)) {
            revealLetter(letterGuessed);
        } else {
            wrongLetter();
        }
    }

    //checks if the guessed letter is in the secret word
    private boolean letterInSecretWord(char letterGuessed){
        for(char secretLetter:secretWord){
            if(secretLetter == letterGuessed) {
                return true;
            }
        }
        return false;
    }

    //swaps the underscores with the correctly guessed letter
    private void revealLetter(char letterGuessed) {
        for (int i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letterGuessed) {
                score.updateScore(scoreOnGuess);
                this.displayedWord[i] = letterGuessed;
            }
        }
        if (String.valueOf(displayedWord).equals(String.valueOf(secretWord))) {
            win();
        }
        System.out.println("Updated displayedWord: " + String.valueOf(displayedWord));

    }

    //decrements guesses remaining
    private void wrongLetter(){
        this.guesses--;
        if (guesses == 0)
            lose();
    }


    //when game is won
    public void win(){
        //double points on flawless win
        if (flawless == guesses)
            score.updateScore(scoreOnWin);
        score.updateScore(scoreOnWin);
        this.gameStatus = "won";
    }

    public void lose(){
        this.displayedWord = this.secretWord;
        this.gameStatus = "lost";
    }

    //New game, score resets
    public void newGame(){
        System.out.println("starting new game");
        this.guesses = 7;
        System.out.println("this.guesses = 7; "+this.guesses);
        score.resetScore();
        System.out.println("score.resetScore(); "+this.score);
        getSecretWord();
        System.out.println("getSecretWord(); "+ Arrays.toString(this.secretWord));
        this.lettersGuessed.clear();
        System.out.println("this.lettersGuessed.clear(); "+ this.lettersGuessed);
        setDisplayedWord();
        System.out.println("setDisplayedWord(); "+ Arrays.toString(this.displayedWord));
        this.gameStatus = "in progress";
        System.out.println("this.gameStatus: "+this.gameStatus);
    }

    //Continue Game, score persists
    public void continueGame(){
        this.guesses = 7;
        getSecretWord();
        this.lettersGuessed.clear();
        setDisplayedWord();
        this.gameStatus = "in progress";
    }
    //get total score
    public int getTotalScore(){
        return score.getScore();
    }

}
