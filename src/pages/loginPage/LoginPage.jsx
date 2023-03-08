import React from "react";
import styled from "styled-components";
import LoginInterface from "../../components/loginInterface/LoginInterface";

const StyledLoginPage = styled.div``;

const StyledHeader = styled.h1``;

const StyledParagraph = styled.p``;

const StyledLinkContainer = styled.div``;

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <StyledHeader>MeFit</StyledHeader>
      <StyledParagraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsa voluptates ut facilis
        odit ab fugit distinctio sunt aliquid eius?
      </StyledParagraph>
      <LoginInterface />
      <StyledLinkContainer>Terms of Use - Help - Privacy Policy</StyledLinkContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;
