import React from 'react';

const Alphabet = ({ disabledLetters, onLetterSelect }) => {
    // Alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div>
            {/* Map alphabet array to make buttons */}
            {alphabet.map((letter, index) => (
                <button 
                    key={index}
                    onClick={() => onLetterSelect(letter)}
                    disabled={disabledLetters.includes(letter)}
                    className="btn btn-primary btn-xl mr-2 mb-2"
                    style={{ fontSize: '125%', padding: '2% 3%' }}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}

export default Alphabet;
