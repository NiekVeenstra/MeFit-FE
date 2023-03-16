import React, { useEffect } from "react";
import keycloak from "../../keycloak";
import decode from "jwt-decode";
import styled from "styled-components";
import LoginInterface from "../../components/loginInterface/LoginInterface";
import { getUser, getUsers, loginUser, postUser } from "../../api/userKeycloak/user";
import { useUser } from "../../context/UserContext";

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  //height: 100vh;
  border: solid red 1px;
`;

const StyledParagraph = styled.p``;

const StyledLinkContainer = styled.div``;

const LoginPage = () => {
  // const [keycloakData, setKeycloakData] = useState({
  //   id: 0,
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  //   isContributor: false,
  //   isAdmin: false,
  // });
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
    // setKeycloakData({
    setUser({
      id: decodedToken.sid,
      email: decodedToken.email,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      isContributor: false,
      isAdmin: false,
    });
  }, [setUser]);

  return (
    <>
      {keycloak.authenticated && (
        <StyledLoginPage>
          <StyledParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsa voluptates ut
            facilis odit ab fugit distinctio sunt aliquid eius?
          </StyledParagraph>
          <LoginInterface />
          <StyledLinkContainer>Terms of Use - Help - Privacy Policy</StyledLinkContainer>
          <button
            onClick={() => {
              getUsers();
            }}
          >
            get users
          </button>
          <button
            onClick={() => {
              getUser(user.id);
            }}
          >
            get user
          </button>
          <button
            onClick={() => {
              postUser(user);
            }}
          >
            post user
          </button>
          <button
            onClick={() => {
              loginUser(user);
            }}
          >
            login button
          </button>
        </StyledLoginPage>
      )}
    </>
  );
};

export default LoginPage;
