import React, { useEffect, useState } from "react";
import DropdownMenu from "../navbar/DropdownMenu";
import decode from "jwt-decode";
import keycloak from "../../keycloak";
import styled from "styled-components";

const StyledApplicationFrameContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColorDark};
  width: 100%;
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom: solid 0.15rem ${(props) => props.theme.colors.mainColor};
`;

const ApplicationFrame = () => {
  const decodedToken = decode(keycloak.token);
  const userName = decodedToken.name;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledApplicationFrameContainer>
      <h1>MeFit</h1>
      {screenWidth > 400 && <h3>{userName}</h3>}

      <DropdownMenu />
    </StyledApplicationFrameContainer>
  );
};

export default ApplicationFrame;
