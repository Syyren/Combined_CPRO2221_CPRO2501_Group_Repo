import React from 'react';

const info = {
    stroke: 'var(--bs-info)'
};

const Cup = () => (
    <g>
        {/* cup */}
        <line style={info} x1="10%" y1="29%" x2="20%" y2="29%" strokeWidth="2" />{/* bottom line */}
        <line style={info} x1="10%" y1="29%" x2="8%" y2="19%" strokeWidth="2" />{/* left line */}
        <line style={info} x1="20%" y1="29%" x2="22%" y2="19%" strokeWidth="2" />{/* right line */}
    </g>
);

export default Cup;
