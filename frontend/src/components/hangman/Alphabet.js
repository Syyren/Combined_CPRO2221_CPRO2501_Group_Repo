import React from 'react';

class Alphabet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLetters: [] //initialize empty array for storing selected letters
        };
    }

    handleLetterSelect(letter) {
        //adding letters to array after click
        this.setState(prevState => ({
            selectedLetters: [...prevState.selectedLetters, letter]
        }));
        this.props.onLetterSelect(letter);
    }

    clearSelectedLetters() {
        //clear selectedLetters array
        this.setState({ selectedLetters: [] });
    }
    
    render() {
        //alphabet
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        return (
            <div>
                {/*map alphabet array to make buttons */}
                {alphabet.map((letter, index) => (
                    <button 
                        key={index}
                        onClick={() => this.handleLetterSelect(letter)}
                        disabled={this.state.selectedLetters.includes(letter)}
                        className="btn btn-primary btn-xl mr-2 mb-2"
                        style={{ fontSize: '125%', padding: '2% 3%' }}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        );
    }
}

export default Alphabet;

