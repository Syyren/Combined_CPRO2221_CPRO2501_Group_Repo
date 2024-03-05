package com.brcg.coolcatgames.feature;

import lombok.Data;

@Data
public class Hangman {
    private int guesses;
    private char[] secretWord;
    private char[] displayedWord;
    private final Alphabet[] ALPHABET = Alphabet.values();
    private char letterGuessed;

    //methods -> getSecretWord, setDisplayedWord,
    //           revealLetter, guessLetter, wrongLetter
}
