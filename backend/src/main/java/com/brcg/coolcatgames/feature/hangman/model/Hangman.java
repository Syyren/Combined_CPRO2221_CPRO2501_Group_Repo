package com.brcg.coolcatgames.feature.hangman.model;

import lombok.Data;

import java.util.Arrays;

@Data
public class Hangman {
    private char[] secretWord;
    private char[] displayedWord;
    private char letterGuessed;
    private HangmanScore score = new HangmanScore();

    //game values
    private int guesses = 7;
    private int scoreOnGuess = 5;
    private int scoreOnWin = 50;

    //constructor
    public Hangman(){
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
            score.updateScore(scoreOnGuess);
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
                this.displayedWord[i] = letterGuessed;
            }
        }

        System.out.println("Updated displayedWord: " + String.valueOf(displayedWord));

        if (String.valueOf(displayedWord).equals(String.valueOf(secretWord))) {
            win();
        }
    }

    //decrements guesses remaining
    private void wrongLetter(){
        this.guesses--;
        if (this.guesses == 0){
            gameOver();
        }
    }

    //when game is lost or refuse to continue
    public void gameOver(){
        score.resetScore();
        newGame();
    }

    //when game is won
    public void win(){
        score.updateScore(scoreOnWin);
        if(playAgain()){
            newGame();
        } else {
            gameOver();
        }
    }

    //prompt for replay
    private boolean playAgain(){
        //prompt here
        return true;
    }

    //New Game +
    public void newGame(){
        this.guesses = 7;
        getSecretWord();
        setDisplayedWord();
    }

    //get total score
    public int getTotalScore(){
        return score.getScore();
    }

}
