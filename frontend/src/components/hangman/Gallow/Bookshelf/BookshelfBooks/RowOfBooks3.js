import React from 'react';

const RowOfBooks3 = ({ colours }) => {
  return (
    <g>    
      {/* 3rd shelf books */}
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="15%" y1="37%" x2="25%"  y2="48%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="34%" y1="36%" x2="34%" y2="49%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="44%" y1="36%" x2="44%" y2="49%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="54%" y1="36%" x2="54%" y2="49%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="64%" y1="36%" x2="64%" y2="49%" strokeWidth="15" />                
    </g>
  );
};

export default RowOfBooks3;
