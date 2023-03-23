import React, { useEffect } from "react";
import keycloak from "../../keycloak";
import decode from "jwt-decode";
import styled from "styled-components";
import { loginUser } from "../../api/userKeycloak/user";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUserProfiles } from "../../api/profile/profile";

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
  @media (max-width: 500px) {
    width: 100%;
    border: none;
  }
`;

const StyledTitle = styled.h3`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  font-size: 1.5rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser({
    // id: 0,
    // email: "",
    // firstName: "",
    // lastName: "",
    // isContributor: false,
    // isAdmin: false,
  });

  useEffect(() => {
    !keycloak.authenticated && keycloak.login();
    const decodedToken = decode(keycloak.token);
    const adminCheck = decodedToken.realm_access.roles.filter((role) => role === "ADMIN");
    const contributorCheck = decodedToken.realm_access.roles.filter((role) => role === "CONTRIBUTOR");

    setUser({
      id: decodedToken.sub,
      email: decodedToken.email,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      isContributor: contributorCheck.length !== 0,
      isAdmin: adminCheck.length !== 0,
    });
  }, [setUser]);

  const handleLogin = async () => {
    const getUserProfilesData = await getUserProfiles();
    const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);

    if (checkNum.length === 0) {
      navigate("/profile");
    } else {
      loginUser(user);
      navigate("/dashboard");
    }
  };

  return (
    <>
      {keycloak.authenticated && (
        <StyledLoginPage>
          <StyledEnterContainer>
            <StyledTitle>MeFit</StyledTitle>
            <StyledTitle>Welcome</StyledTitle>
            <StyledParagraph>
              Get ready to achieve your fitness goals with our cutting-edge app! Whether you're
              looking to build muscle, burn fat, or simply stay active, MeFit has everything you
              need to make it happen. Our easy-to-use interface, personalized workout plans, and
              expert guidance will help you unlock your full potential and transform your body and
              mind.
            </StyledParagraph>
            <StyledButton
              onClick={() => {
                handleLogin();
              }}
            >
              Enter
            </StyledButton>
          </StyledEnterContainer>
        </StyledLoginPage>
      )}
    </>
  );
};

export default LoginPage;
