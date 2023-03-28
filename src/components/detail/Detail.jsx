import React from 'react';
import styled from "styled-components";


const StyledExerciseDetailContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const StyledExerciseDetailImage = styled.img`
  width: 200px;
`;

const StyledExerciseDetailTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledExerciseDetailName = styled.h1`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.h2};
  @media (max-width: 500px){
    font-size: 25px;
  }
`;

const StyledExerciseDetailDescription = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.h3};
`;

const StyledExerciseDetailExtraName = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.h3};
  text-align: left;
`;

const StyledExerciseDetailTargetTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.h3};
  margin-top: 30px;
  text-align: left;
  margin-left: -100px;
`;

const Detail = ({exerciseDetail}) => {
  const { bodyPart, gifUrl, name, target, equipment} = exerciseDetail;

  const extraDetail = [
    {
        name: bodyPart
    },
    {
        name: target
    },
    {
        name: equipment
    }
  ]

  return (
    <StyledExerciseDetailContainer>
      <StyledExerciseDetailImage src={gifUrl} alt={name} loading="lazy" />
      <StyledExerciseDetailTextContainer>
        <StyledExerciseDetailName>{name}</StyledExerciseDetailName>
        <StyledExerciseDetailDescription>
          Exercises keep you strong. {name} is one of the best exercises to target your {target}. It will help you improve your mood and gain energy.
        </StyledExerciseDetailDescription>
        <StyledExerciseDetailTargetTitle>Targets:</StyledExerciseDetailTargetTitle>
        <ul>
        {extraDetail.map((item, index) => (
          <li key={index}>
            <StyledExerciseDetailExtraName>{item.name}</StyledExerciseDetailExtraName>
          </li>
        ))}
        </ul>
      </StyledExerciseDetailTextContainer>
    </StyledExerciseDetailContainer>
  )
}

export default Detail