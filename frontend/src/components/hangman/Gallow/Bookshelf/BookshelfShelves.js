import React from 'react';

const secondary = {
  stroke: 'var(--bs-secondary)'
};

const BookshelfShelves = () => (
    <g> 
      {/* bookshelf shelves */}
      <line style={secondary} x1="10%" y1="85%" x2="75%" y2="85%" strokeWidth="5" />{/* Base shelf */}
      <line style={secondary} x1="75%" y1="70%" x2="10%" y2="70%" strokeWidth="5" />{/* 2nd shelf */}
      <line style={secondary} x1="75%" y1="50%" x2="10%" y2="50%" strokeWidth="5" />{/* 3rd shelf */}
    </g>
);

export default BookshelfShelves;
