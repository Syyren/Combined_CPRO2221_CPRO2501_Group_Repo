import React from 'react';
import Score from './Score';
import Gallow from './Gallow';
import Word from './Word';
import Alphabet from './Alphabet';


class Hangman extends React.Component {
    render(){
        return <>
            <Score />
            <Gallow />
            <Word />
            <Alphabet />
        </>
    }
}
export default Hangman;