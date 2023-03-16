import React from 'react';
import BodyPart from '../bodyPart/BodyPart';

const ExercisesBox = ({ data, bodyPart, setBodyPart }) => {
    return (
        <div>
            ExercisesBox
            {data.map((item) => (
                <div 
                    key={item.id || item}
                    itemID={item.id || item}
                    title={item.id || item}
                >
                    <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
                </div>
            ))}
        </div>
    );
};

export default ExercisesBox;