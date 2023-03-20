import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import decode from "jwt-decode";
import styled from "styled-components";
import { loginUser } from "../../api/userKeycloak/user";
import { useUser, useUserProfile } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserProfiles, postUserProfile } from "../../api/profile/profile";

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
  const [IdNumber, setIdNumber] = useState(0);
  const { user, setUser } = useUser({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    isContributor: false,
    isAdmin: false,
  });
  // const { userProfile, setUserProfile } = useUserProfile({});

  useEffect(() => {
    !keycloak.authenticated && keycloak.login();
    const decodedToken = decode(keycloak.token);

    // const uuid = decodedToken.sid;
    // const encoder = new TextEncoder();
    // const data = encoder.encode(uuid);
    // crypto.subtle
    //   .digest("SHA-256", data)
    //   .then((buffer) => {
    //     const hex = [...new Uint8Array(buffer)]
    //       .map((b) => b.toString(16).padStart(2, "0"))
    //       .join("");
    //     const maxNumId = 1000000000; // Set the maximum value for the numId
    //     const numId = parseInt(hex, 16) % maxNumId;
    //     setIdNumber(numId);
    //   })
    //   .catch(console.error);

    setUser({
      id: decodedToken.sub,
      email: decodedToken.email,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      isContributor: false,
      isAdmin: false,
    });
  }, [setUser]);

  const handleLogin = async () => {
    const getUserProfilesData = await getUserProfiles();
    console.log(user.id);
    const checkNum = await getUserProfilesData.filter(
      (profile) => profile.userId === user.id
    );



    if (checkNum.length === 0) {
      navigate("/profile");
    } else {
      loginUser(user);
      navigate("/dashboard");
    }



    // setUserProfile({
    //   ...userProfile,
    //   id: IdNumber,
    //   // weight: 0,
    //   // height: 0,
    //   // medicalConditions: "",
    //   // disabilities: "",
    //   // userId: 0,
    //   // address: {
    //   //   addressLine1: "string",
    //   //   addressLine2: "string",
    //   //   addressLine3: "string",
    //   //   postalCode: "string",
    //   //   city: "string",
    //   //   country: "string",
    //   // },
    // });

    // if (profileData.id === undefined) {
    //   navigate("/profile");
    // } else {
    //   loginUser(user);
    //   navigate("/dashboard");
    // }
  };

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
          </StyledEnterContainer>
        </StyledLoginPage>
      )}
    </>
  );
};

export default LoginPage;
