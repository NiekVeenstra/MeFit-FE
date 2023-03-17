import React, { useEffect } from "react";
import keycloak from "../../keycloak";
import decode from "jwt-decode";
import styled from "styled-components";
import { loginUser } from "../../api/userKeycloak/user";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { postUserProfile } from "../../api/profile/profile";

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 3.3rem);
`;

const StyledEnterContainer = styled.div`
  border: solid 0.15rem ${(props) => props.theme.colors.mainColor};
  border-radius: 15px;
  width: 50%;
  max-width: 25rem;
  margin: 5rem;
  padding: 1rem;
  text-align: center;
  @media (max-width: 450px) {
    width: 100%;
    border: none;
  }
`;

const StyledTitle = styled.h3`
  margin-bottom: 1rem;
`;

const StyledParagraph = styled.p`
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { v4: uuidv4 } = require('uuid');

  const { user, setUser } = useUser({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    isContributor: false,
    isAdmin: false,
  });

  useEffect(() => {
    !keycloak.authenticated && keycloak.login();
    const decodedToken = decode(keycloak.token);


    const uuid = decodedToken.sid;
    const uuidBuffer = uuidv4.parse(uuid);
    const uuidBigInt = BigInt(`0x${uuidBuffer.toString('hex')}`);

    console.log(uuidBigInt);


    setUser({
      id: decodedToken.sid,
      email: decodedToken.email,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      isContributor: false,
      isAdmin: false,
    });
  }, [setUser]);

  const handleLogin = () => {
    loginUser(user);
    navigate("/dashboard");
  };

  const test = () => {};

  return (
    <>
      {keycloak.authenticated && (
        <StyledLoginPage>
          <StyledEnterContainer>
            <StyledTitle>Welcome</StyledTitle>
            <StyledParagraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsa voluptates ut
              facilis odit ab fugit distinctio sunt aliquid eius?
            </StyledParagraph>
            <StyledButton
              onClick={() => {
                handleLogin();
              }}
            >
              Enter
            </StyledButton>
            <StyledButton
              onClick={() => {
                postUserProfile();
              }}
            >
              postUserProfile
            </StyledButton>
          </StyledEnterContainer>
        </StyledLoginPage>
      )}
    </>
  );
};

export default LoginPage;
