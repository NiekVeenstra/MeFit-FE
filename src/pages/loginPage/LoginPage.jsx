import React, { useEffect } from "react";
import keycloak from "../../keycloak";
import styled from "styled-components";
import LoginInterface from "../../components/loginInterface/LoginInterface";
import { getUsers } from "../../api/testing/user";

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  //height: 100vh;
  border: solid red 1px;
`;

const StyledHeader = styled.h1``;

const StyledParagraph = styled.p``;

const StyledLinkContainer = styled.div``;

const LoginPage = () => {
  useEffect(() => {
    {
      !keycloak.authenticated && keycloak.login();
    }
  }, []);

  return (
    <>
      {keycloak.authenticated && (
        <StyledLoginPage>
          <StyledHeader>MeFit</StyledHeader>
          <StyledParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsa voluptates ut
            facilis odit ab fugit distinctio sunt aliquid eius?
          </StyledParagraph>
          <LoginInterface />
          <StyledLinkContainer>Terms of Use - Help - Privacy Policy</StyledLinkContainer>
          <button onClick={()=> {getUsers()}}>test check</button>
        </StyledLoginPage>
      )}
    </>
  );
};

export default LoginPage;
