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

const StyledReloadButton = styled.button`
  position: absolute;
  align-self: end;

  img{
    width: 1.3rem;
  }
`;

const ProfilePage = () => {
  const { user } = useUser({});
  const { userProfile, setUserProfile } = useUserProfile({});
  const { userCheck, setUserCheck } = useUserCheck(true);
  const [isHovered, setIsHovered] = useState(false);

  const [updateImage, setUpdateImage] = useState(true);

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

  // const handleProfileUpdate = () => {
  //   getUserData();
  // };

  return (
    <StyledProfilePage>
      <h3>Profile</h3>
      {userCheck ? (
        <ProfileCreationForm />
      ) : (
        <StyledUserProfileContainer>
          <StyledImageContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <StyledImage
              src={
                updateImage
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  : "https://i.guim.co.uk/img/media/771b1fbf98f680a716afe138a95fc2a80de9c149/0_645_3504_2101/master/3504.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=66af6e40fc5b5c96028d6c0ba87c2d12"
              }
              alt="User profile picture"
            />
            {isHovered && (
              <StyledEditButton onClick={() => setUpdateImage(!updateImage)}>
                Edit Profile Picture
              </StyledEditButton>
            )}
          </StyledImageContainer>
          <StyledProfileInfoContainer>
            <StyledReloadButton onClick={() => getUserData()}>
              <img
                src="https://cdn.icon-icons.com/icons2/1812/PNG/512/4213447-arrow-load-loading-refresh-reload-restart-sync_115423.png"
                alt=""
              />
            </StyledReloadButton>
            <div>
              Name: {user?.firstName} {user?.lastName}
            </div>
            <div>E-mail: {user?.email}</div>
            <div>Height: {userProfile[0]?.height}cm</div>
            <div>Weight: {userProfile[0]?.weight}kg</div>
            <div>Disabilities: {userProfile[0]?.disabilities}</div>
            <div>Medical Conditions: {userProfile[0]?.medicalConditions}</div>
            <StyledButton onClick={() => setUserCheck(true)}>Edit Profile</StyledButton>
          </StyledProfileInfoContainer>
        </StyledUserProfileContainer>
      )}
    </StyledProfilePage>
  );
};

export default ProfilePage;
