import React, { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../../utils/fetchData";
import ExerciseCard from "../exerciseCard/ExerciseCard";
import styled from "styled-components";

const PAGE_SIZE = 50; // The number of exercises to show per page

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledExerciseCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledPaginationButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const StyledPaginationButton = styled.button`
  padding: 10px;
  background-color: #fff;
  color: ${(props) => props.theme.colors.textColorDark};
  font-size: ${(props) => props.theme.fontSize.h4};
  margin: 5px;
  border: 1px solid ${(props) => props.theme.colors.mainColor};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainColor};
    color: #fff;
  }

  &:disabled {
    background-color: #000;
    color: #fff;
    cursor: not-allowed;
  }
`;

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indexes of the exercises to show on the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Slice the exercises array to show only the exercises on the current page
  const exercisesToShow = exercises.slice(startIndex, endIndex);

  const totalPages = Math.ceil(exercises.length / PAGE_SIZE); // Calculate the total number of pages

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    <StyledContainer>
      <StyledExerciseCardContainer>
        {exercisesToShow.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </StyledExerciseCardContainer>
      <StyledPaginationButtonsContainer>
        <StyledPaginationButton
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </StyledPaginationButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <StyledPaginationButton
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </StyledPaginationButton>
        ))}
        <StyledPaginationButton
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </StyledPaginationButton>
      </StyledPaginationButtonsContainer>
    </StyledContainer>
  );
};

export default Exercises;
