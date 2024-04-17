import React from 'react';

const RowOfBooks2 = ({ colours }) => {
  return (
    <g>
      {/* 2nd shelf books */}
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="15%" y1="57%" x2="25%"  y2="68%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="34%" y1="56%" x2="34%" y2="69%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="44%" y1="56%" x2="44%" y2="69%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="54%" y1="56%" x2="54%" y2="69%" strokeWidth="15" />
      <line style={{ stroke: colours[Math.floor(Math.random() * colours.length)] }} x1="64%" y1="56%" x2="64%" y2="69%" strokeWidth="15" />
    </g>
  );
};

export default RowOfBooks2;
