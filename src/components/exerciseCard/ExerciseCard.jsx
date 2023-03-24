import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledExerciseCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  width: 45%;
`;

const StyledLink = styled.a`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.mainColor};
  border-radius: 10px;
  padding-bottom: 10px;
`;

const StyledExerciseCardImage = styled.img`
  width: 200px;
  margin-bottom: 0.5rem;
`;

const StyledExerciseCardButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  color: #FFF;
  font-size: ${(props) => props.theme.fontSize.h4};
  margin: 0 0.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
`;

const StyledExerciseCardName = styled.p`
  margin: 0;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.h3};
  font-weight: bold;
`;

const ExerciseCard = ({ exercise }) => {
  return (
    <StyledExerciseCardContainer>
      <StyledLink href={`/exercise/${exercise.id}`}>
        <StyledExerciseCardImage src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
        <div>
          <StyledExerciseCardName>{exercise.name}</StyledExerciseCardName>
          <StyledExerciseCardButton>{exercise.bodyPart}</StyledExerciseCardButton>
          <StyledExerciseCardButton>{exercise.target}</StyledExerciseCardButton>
        </div>
      </StyledLink>
    </StyledExerciseCardContainer>
  );
};

export default ExerciseCard