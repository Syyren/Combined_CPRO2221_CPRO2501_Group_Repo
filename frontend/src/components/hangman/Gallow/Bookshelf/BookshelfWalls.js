import React from 'react';

const secondary = {
  stroke: 'var(--bs-secondary)'
};

const BookshelfWalls = () => (
    <g>
      {/* bookshelf walls */}
      <line style={secondary} x1="10%" y1="90%" x2="10%" y2="30%" strokeWidth="5" />{/* left wall */}
      <line style={secondary} x1="75%" y1="90%" x2="75%" y2="30%" strokeWidth="5" />{/* right wall */}
      <line style={secondary} x1="75%" y1="30%" x2="10%" y2="30%" strokeWidth="5" />{/* top shelf */}
    </g>
  );

export default BookshelfWalls;
