import React, { useState } from "react";
import styled from "styled-components";

import SearchExercises from "../../components/searchExercises/SearchExercises";
import Exercises from "../../components/exercises/Exercises";

const StyledExercisesPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`;

const StyledCenterContainer = styled.div`
  border: solid 0.15rem ${(props) => props.theme.colors.mainColor};
  border-radius: 15px;
  width: 80%;
  max-width: 80%;
  margin-top: 50px;
  padding: 1rem;
  text-align: center;
  @media (max-width: 450px) {
    width: 100%;
    border: none;
  }
`;

const ExercisesPage = () => {
    const [bodyPart, setBodyPart] = useState('all');
    const [exercises, setExercises] = useState([]); 

    return (
        <StyledExercisesPage>
            <StyledCenterContainer>
                <SearchExercises 
                setExercises={setExercises}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                />
                <Exercises 
                exercises={exercises} 
                setExercises={setExercises} 
                bodyPart={bodyPart} 
                />
            </StyledCenterContainer>
        </StyledExercisesPage>
    )
}
export default ExercisesPage
