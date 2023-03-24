import { border } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";


const StyleDaysLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: calc(16vh - 3.3rem);
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: 3.3rem;
  padding: 0.6rem;
  border-radius: 1.5rem;
  }
`;

const DaysLeft = () => {
  const [days, setDays] = useState(0);
  const deadline = "March, 28, 2023";
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyleDaysLeft role="timer">
      <p> You have</p>
      <div >
      <p id="day">{days < 10 ? "0" + days : days}</p>
      </div>
      <p>days left</p>
    </StyleDaysLeft>
  );
};

export default DaysLeft;
