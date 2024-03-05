package com.brcg.coolcatgames.feature;

import lombok.Data;

@Data
public class Hangman {
    private int guesses;
    private char[] secretWord;
    private char[] displayedWord;
    private final Alphabet[] ALPHABET = Alphabet.values();
    private char letterGuessed;

    //methods -> getSecretWord, getDisplayedWord,
    //           revealLetter, guessLetter, wrongLetter

    //using Noun class to generate secret word
    private char[] getSecretWord(){
        //getting
        Noun noun = new Noun();
        String randomNoun = noun.getNoun().toUpperCase();
        return this.secretWord = randomNoun.toCharArray();
    }
    //generates displayed word based off of secret word obtained
    public char[] getDisplayedWord() {
        int secretWordLength = getSecretWord().length;
        this.displayedWord = new char[secretWordLength];
        //adds an underscore for every letter, adds any non letters as their own chars. ie: hyphens and spaces persist
        for (int i = 0; i < this.secretWord.length; i++) {
            char letter = this.secretWord[i];
            if (Character.isLetter(letter))
                this.displayedWord[i] = '_';
            else
                this.displayedWord[i] = letter;
        }
        return this.displayedWord;
    }

    //handles logic upon picking letter
    public void guessLetter(char letterGuessed){
        if (letterInSecretWord(letterGuessed))
            revealLetter(letterGuessed);
        else
            wrongLetter();
    }

    //checks if the guessed letter is in the secret word
    private boolean letterInSecretWord(char letterGuessed){
        for(char secretLetter:this.secretWord){
            if(secretLetter == letterGuessed)
                return true;
        }
        return false;
    }
    //swaps the underscores with the correctly guessed letter
    private void revealLetter(char letterGuessed){
        for (int i = 0; i < this.secretWord.length; i++) {
            if (this.secretWord[i] == letterGuessed)
                this.displayedWord[i] = letterGuessed;
        }
    }

    //decrements guesses remaining
    private void wrongLetter(){
        this.guesses--;
    }

}
