import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserProfiles } from "../../api/profile/profile";
import ProfileCreationForm from "../../components/profileCreationForm/ProfileCreationForm";
import { useUser, useUserCheck, useUserProfile } from "../../context/UserContext";

const StyledProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 45rem;

  border: solid 0.15rem ${(props) => props.theme.colors.mainColor};
  border-radius: 15px;
`;

const StyledImageContainer = styled.div`
  width: 100%;
  border-radius: 15px 15px 0 0;
  position: relative;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  margin: 0;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 15px 15px 0 0;
  border-bottom: solid 0.15rem ${(props) => props.theme.colors.mainColor};

  &:hover {
    filter: brightness(70%);
  }
`;

const StyledProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  line-height: 2rem;
`;

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  margin: 1rem 0 0 0;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  align-self: center;
`;

const ProfilePage = () => {
  const { user } = useUser({});
  const { userProfile, setUserProfile } = useUserProfile({});
  const { userCheck, setUserCheck } = useUserCheck(true);
  const [isHovered, setIsHovered] = useState(false);

  const getUserData = async () => {
    const getUserProfilesData = await getUserProfiles();
    const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
    setUserProfile(checkNum);
    setUserCheck(checkNum.length === 0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <StyledProfilePage>
      <h3>Profile</h3>
      {
        // userProfile === null ||
        userCheck ? (
          <ProfileCreationForm />
        ) : (
          <StyledUserProfileContainer>
            <StyledImageContainer
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
            >
              <StyledImage
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="User profile picture"
              />
              {isHovered && <StyledEditButton>Edit Profile Picture</StyledEditButton>}
            </StyledImageContainer>
            <StyledProfileInfoContainer>
              <div>
                Name: {user.firstName} {user.lastName}
              </div>
              <div>E-mail: {user.email}</div>
              <div>Height: {userProfile[0].height}cm</div>
              <div>Weight: {userProfile[0].weight}kg</div>
              <div>Disabilities: {userProfile[0].disabilities}</div>
              <div>Medical Conditions: {userProfile[0].medicalConditions}</div>
              {/* <div>Address: {userProfile[0].address ? userProfile[0].address : "none"}</div> */}
              <StyledButton onClick={() => setUserCheck(true)}>Edit Profile</StyledButton>
            </StyledProfileInfoContainer>
          </StyledUserProfileContainer>
        )
      }
    </StyledProfilePage>
  );
};

export default ProfilePage;
