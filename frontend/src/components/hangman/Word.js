import React from 'react';

const Word = ({ displayedWord }) => {
    if (typeof displayedWord === 'string') {
        displayedWord = displayedWord.split('');
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {displayedWord.map((letter, index) => (
                <span key={index} style={{ marginRight: '5px', fontSize: '48px' }}>
                    {letter === '_' ? '_' : letter}
                </span>
            ))}
        </div>
    );
};

export default Word;
