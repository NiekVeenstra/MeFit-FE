import React from 'react'
import styled from "styled-components";

const StyledExerciseVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledExerciseVideosMessage = styled.div`
  font-size: ${(props) => props.theme.fontSize.h3};
  font-weight: bold;
`;

const StyledExerciseVideosLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledExerciseVideosLink = styled.a`
  margin: 0 0.5rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.textColorDark};
`;

const StyledExerciseVideosImage = styled.img`
  width: 200px;
  margin-bottom: 0.5rem;
`;

const StyledExerciseVideosTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.h4};
  font-weight: bold;
`;

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if(!exerciseVideos.length) return 'loading...';

  return (
    <StyledExerciseVideosContainer>
      <StyledExerciseVideosMessage>Watch {name} exercise videos.</StyledExerciseVideosMessage>
      <StyledExerciseVideosLinkContainer>
        {exerciseVideos?.slice(0, 3).map((item, index) => (
          <StyledExerciseVideosLink
            key={index}
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <StyledExerciseVideosImage src={item.video.thumbnails[0].url} alt={item.video.title} />
            <StyledExerciseVideosTitle>{item.video.title}</StyledExerciseVideosTitle>
          </StyledExerciseVideosLink>
        ))}
      </StyledExerciseVideosLinkContainer>
    </StyledExerciseVideosContainer>
  )
}

export default ExerciseVideos