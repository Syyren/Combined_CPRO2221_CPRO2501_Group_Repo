import React from 'react';

class Gallow extends React.Component {
    render() {
        const { guesses } = this.props;

        const secondary = {
            stroke: 'var(--bs-secondary)' //using bootstrap
        };
        const primary = {
            stroke: 'var(--bs-info)'
        };
        const warning = {
            stroke: 'var(--bs-warning)'
        };
        const danger = {
            stroke: 'var(--bs-danger)'
        };
        const success = {
            stroke: 'var(--bs-success)'
        };

        const renderGuess = (guessNumber, component) => {
            if (guesses === 0)
                number = -1;
            return guesses <= guessNumber ? component : null;
        };
        var number = 2;
        return (
            <div style={{ width: '20vw', margin: '0 auto' }}>
                <svg width="100%" height="100%" viewBox="0 0 200 300">
                    
                    {/*bookshelf*/}
                    <g>   
                        {/*bookshelf walls*/}
                            <line style={secondary} x1="10%" y1="90%" x2="10%" y2="30%" strokeWidth="5" />{/*left wall*/}
                            <line style={secondary} x1="75%" y1="90%" x2="75%" y2="30%" strokeWidth="5" />{/*right wall*/}
                            <line style={secondary} x1="75%" y1="30%" x2="10%" y2="30%" strokeWidth="5" />{/*top shelf*/}
                    </g>

                    {renderGuess(6,( <g> 
                        {/*bookshelf shelves*/}
                            <line style={secondary} x1="10%" y1="85%" x2="75%" y2="85%" strokeWidth="5" />{/*Base shelf*/}
                            <line style={secondary} x1="75%" y1="70%" x2="10%" y2="70%" strokeWidth="5" />{/*2nd shelf*/}
                            <line style={secondary} x1="75%" y1="50%" x2="10%" y2="50%" strokeWidth="5" />{/*3rd shelf*/}
                        </g>))}

                    {/*bookshelf books*/}
                    {renderGuess(5,(<g>                        
                            {/*Base shelf books*/}
                                <line style={primary} x1="15%" y1="73%" x2="25%"  y2="83%" strokeWidth="15" />
                                <line style={warning} x1="34%" y1="72%" x2="34%" y2="84%" strokeWidth="15" />
                                <line style={danger} x1="44%" y1="72%" x2="44%" y2="84%" strokeWidth="15" />
                                <line style={success} x1="54%" y1="72%" x2="54%" y2="84%" strokeWidth="15" />
                                <line style={danger} x1="64%" y1="72%" x2="64%" y2="84%" strokeWidth="15" />
                        </g>))}

                    {renderGuess(4,(<g>
                            {/*2nd shelf books*/}
                                <line style={warning} x1="15%" y1="57%" x2="25%"  y2="68%" strokeWidth="15" />
                                <line style={success} x1="34%" y1="56%" x2="34%" y2="69%" strokeWidth="15" />
                                <line style={primary} x1="44%" y1="56%" x2="44%" y2="69%" strokeWidth="15" />
                                <line style={success} x1="54%" y1="56%" x2="54%" y2="69%" strokeWidth="15" />
                                <line style={success} x1="64%" y1="56%" x2="64%" y2="69%" strokeWidth="15" />
                        </g>))}

                    {renderGuess(3,(<g>    
                            {/*3rd shelf books*/}
                                <line style={primary} x1="15%" y1="37%" x2="25%"  y2="48%" strokeWidth="15" />
                                <line style={success} x1="34%" y1="36%" x2="34%" y2="49%" strokeWidth="15" />
                                <line style={danger} x1="44%" y1="36%" x2="44%" y2="49%" strokeWidth="15" />
                                <line style={success} x1="54%" y1="36%" x2="54%" y2="49%" strokeWidth="15" />
                                <line style={warning} x1="64%" y1="36%" x2="64%" y2="49%" strokeWidth="15" />                
                        </g>))}
                        
                    {renderGuess(number, (<g>
                        {/*cup*/}
                            <line style={primary} x1="10%" y1="29%" x2="20%" y2="29%" strokeWidth="2" />{/*bottom line*/}
                            <line style={primary} x1="10%" y1="29%" x2="8%" y2="19%" strokeWidth="2" />{/*left line*/}
                            <line style={primary} x1="20%" y1="29%" x2="22%" y2="19%" strokeWidth="2" />{/*right line*/}
                        </g>))}

                    {/*cat*/}
                    {renderGuess(1,(<g>
                        {/*body*/}
                            <ellipse style={success} transform="rotate(25 100 100)" cx="100" cy="65" rx="25" ry="15" strokeWidth="2" fill="none"/>
                        {/*head*/}
                            <circle style={success} cx="35%" cy="20%" r="8%" strokeWidth="2" fill="none" />
                        {/*ears*/}
                            {/*left ear*/}
                                <line style={success} x1="28%" y1="15%" x2="31%" y2="10%" strokeWidth="2" />{/*outside line*/}
                                <line style={success} x1="34%" y1="13%" x2="31%" y2="10%" strokeWidth="2" />{/*inside line*/}
                            {/*right ear*/}
                                <line style={success} x1="43%" y1="15.5%" x2="40%" y2="10%" strokeWidth="2" />{/*outside line*/}
                                <line style={success} x1="37%" y1="13%" x2="40%" y2="10%" strokeWidth="2" />{/*inside line*/}
                        {/*whiskers*/}
                            {/*left side*/}
                                <line style={success} x1="28%" y1="20%" x2="32%" y2="22%" strokeWidth="2" />{/*top*/}
                                <line style={success} x1="26%" y1="22%" x2="32%" y2="22%" strokeWidth="2" /> {/*mid*/}
                                <line style={success} x1="28%" y1="24%" x2="32%" y2="22%" strokeWidth="2" />{/*bottom*/}
                            {/*right side*/}
                                <line style={success} x1="41%" y1="20%" x2="37%" y2="22%" strokeWidth="2" />{/*top*/}
                                <line style={success} x1="43%" y1="22%" x2="37%" y2="22%" strokeWidth="2" />{/*mid*/}
                                <line style={success} x1="41%" y1="24%" x2="37%" y2="22%" strokeWidth="2" />{/*bottom*/}
                        {/*eyes*/}
                            <circle style={success} cx="32%" cy="18%" r="1.5%" strokeWidth="2" fill="none" />{/*left*/}
                            <circle style={success} cx="37%" cy="18%" r="1.5%" strokeWidth="2" fill="none" />{/*right*/}
                        </g>))}
                        
                        {renderGuess(0,(<g>
                        {/*arm*/}
                            <line style={success} x1="20%" y1="24%" x2="30%" y2="26%" strokeWidth="2" />{/*bottom line*/}
                            <line style={success} x1="20%" y1="22%" x2="27%" y2="24%" strokeWidth="2" />{/*top line*/}
                        {/*paw*/}
                            <circle style={success} cx="19%" cy="23%" r="1.5%" strokeWidth="2" fill="none" />{/*pad*/}
                            <circle style={success} cx="18.5%" cy="21%" r=".5%" strokeWidth="2" fill="none" />{/*bean 1*/}
                            <circle style={success} cx="17%" cy="22%" r=".5%" strokeWidth="2" fill="none" />{/*bean 2*/}
                            <circle style={success} cx="16%" cy="23%" r=".5%" strokeWidth="2" fill="none" /> {/*bean 3*/}
                        </g>))}
                    </svg>
            </div>
        );
    }
}

export default Gallow;
