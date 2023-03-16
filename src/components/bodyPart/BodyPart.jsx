import React from 'react';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
    return (
        <div onClick={() => {
            setBodyPart(item);
        }}>
            {item}
        </div>
    );
};

export default BodyPart;