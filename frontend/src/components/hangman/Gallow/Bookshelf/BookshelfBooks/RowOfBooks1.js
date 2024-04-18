import React from 'react';

const RowOfBooks1 = ({ colours }) => {
  return (
    <g>                        
      {/* Base shelf books */}
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="15%" y1="73%" x2="25%"  y2="83%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="34%" y1="72%" x2="34%" y2="84%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="44%" y1="72%" x2="44%" y2="84%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="54%" y1="72%" x2="54%" y2="84%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="64%" y1="72%" x2="64%" y2="84%" strokeWidth="15" />
    </g>
  );
};

export default RowOfBooks1;
