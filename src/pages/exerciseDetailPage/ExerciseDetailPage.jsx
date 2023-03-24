import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import { exerciseOptions, fetchData, youtubeOptions } from "../../utils/fetchData";
import Detail from '../../components/detail/Detail';
import ExerciseVideos from '../../components/exerciseVideos/ExerciseVideos';

const StyledExercisesDetailPage = styled.div`
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

const ExerciseDetailPage = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      
      setExerciseDetail(exerciseDetailData);

      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      
      setExerciseVideos(exerciseVideoData.contents);
    }

    fetchExercisesData();
  }, [id])
  

  return (
    <StyledExercisesDetailPage>
      <StyledCenterContainer>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      </StyledCenterContainer>
    </StyledExercisesDetailPage>
  )
}

export default ExerciseDetailPage