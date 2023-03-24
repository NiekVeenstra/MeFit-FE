import React, {useEffect, useState} from "react";
import { exerciseOptions, fetchData } from "../../utils/fetchData";
import styled from "styled-components";

import ExercisesBox from "../exercisesBox/ExercisesBox";


const StyledSearchExercises = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  padding: 0.6rem;
  border-radius: 15px;
  margin-right: 20px;
  width: 50%;
`;

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
`;

const SearchExercises = ( {setExercises, bodyPart, setBodyPart} ) => {
    const [search, setSearch] = useState('');
    
    const [bodyParts, setBodyParts] = useState([]);
   
    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyParts(['all', ...bodyPartsData]);
        };

        fetchExercisesData();
    }, [])

    const handleSearch = async () => {
        if(search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/', exerciseOptions);

            const searchedExercises = exercisesData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
            ) 

            setSearch('');
            setExercises(searchedExercises);
        }
    } 

    return (
        <StyledSearchExercises>
            <h1>Search Exercises</h1>
            <StyledSearchContainer>
                <StyledInput onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" placeholder="deadlift" />
                <StyledButton onClick={handleSearch}>Search</StyledButton>
            </StyledSearchContainer>
            <div>
                <ExercisesBox data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
            </div>
        </StyledSearchExercises>
        
    )
}

export default SearchExercises;
