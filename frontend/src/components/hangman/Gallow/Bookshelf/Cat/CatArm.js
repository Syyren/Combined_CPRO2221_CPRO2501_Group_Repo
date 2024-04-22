import React from 'react';
const success = {
    stroke: 'var(--bs-success)'
};
const CatArm = () => (
    <g>
                        {/*arm*/}
                            <line style={success} x1="20%" y1="24%" x2="30%" y2="26%" strokeWidth="2" />{/*bottom line*/}
                            <line style={success} x1="20%" y1="22%" x2="27%" y2="24%" strokeWidth="2" />{/*top line*/}
                        {/*paw*/}
                            <circle style={success} cx="19%" cy="23%" r="1.5%" strokeWidth="2" fill="none" />{/*pad*/}
                            <circle style={success} cx="18.5%" cy="21%" r=".5%" strokeWidth="2" fill="none" />{/*bean 1*/}
                            <circle style={success} cx="17%" cy="22%" r=".5%" strokeWidth="2" fill="none" />{/*bean 2*/}
                            <circle style={success} cx="16%" cy="23%" r=".5%" strokeWidth="2" fill="none" /> {/*bean 3*/}
                        </g>
);

export default CatArm;