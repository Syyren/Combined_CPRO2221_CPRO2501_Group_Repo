import React from 'react';
import BookshelfWalls from './Bookshelf/BookshelfWalls';
import BookshelfShelves from './Bookshelf/BookshelfShelves';
import RowOfBooks1 from './Bookshelf/BookshelfBooks/RowOfBooks1';
import RowOfBooks2 from './Bookshelf/BookshelfBooks/RowOfBooks2';
import RowOfBooks3 from './Bookshelf/BookshelfBooks/RowOfBooks3';
import Cup from './Bookshelf/Cup';
import CatBody from './Bookshelf/Cat/CatBody';
import CatArm from './Bookshelf/Cat/CatArm';
import { colours } from './Colours';

class Gallow extends React.Component {
    render() {
        const { guessesRemaining } = this.props; // Assuming guessesRemaining is passed as a prop

        return (
            <div style={{ width: '20vw', margin: '0 auto' }}>
                <svg width="100%" height="100%" viewBox="0 0 200 300">
                    
                    {/* Always render */}
                    <BookshelfWalls />

                    {/* Conditional rendering based on guessesRemaining */}
                    {guessesRemaining <= 6 && <BookshelfShelves />}
                    {guessesRemaining <= 5 && <RowOfBooks1 colours={colours} />}
                    {guessesRemaining <= 4 && <RowOfBooks2 colours={colours} />}
                    {guessesRemaining <= 3 && <RowOfBooks3 colours={colours} />}
                    {(guessesRemaining === 2 ||guessesRemaining === 1) && <Cup />}
                    {guessesRemaining <= 1 && <CatBody />}
                    {guessesRemaining <= 0 && <CatArm />}
                </svg>
            </div>
        );
    }
}

export default Gallow;
