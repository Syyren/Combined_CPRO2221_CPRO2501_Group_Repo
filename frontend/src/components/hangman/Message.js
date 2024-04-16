import React from 'react';

const Message = ({ message }) => {
    return (
        <div className='text-info' style={{ textAlign: 'center', fontSize: '2em' }}>
            {message}
        </div>
    );
};

export default Message;
