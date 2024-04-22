import React from 'react';
const success = {
    stroke: 'var(--bs-success)'
};
const CatBody = () => (
    <g>
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
                        </g>
);

export default CatBody;