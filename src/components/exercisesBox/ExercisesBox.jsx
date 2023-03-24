import React from 'react';
import styled from "styled-components";

const StyledExercisesBox = styled.div`
    padding: 10px;
`;

const StyledSelect = styled.select`
  padding: 0.6rem;
  border-radius: 15px;
  margin-right: 20px;
`;

const ExercisesBox = ({ data, bodyPart, setBodyPart }) => {
    return (
        <StyledExercisesBox>
            <StyledSelect onChange={(e) => setBodyPart(e.target.value)}>
                {data.map((item) => (
                    <option
                        key={item.id || item}
                        itemID={item.id || item}
                        title={item.id || item}
                        value={item.id || item}
                    >
                        {item.id || item}
                    </option>
                ))}
            </StyledSelect>
        </StyledExercisesBox>
    );
};

export default ExercisesBox;