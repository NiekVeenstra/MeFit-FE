import React from "react";
import styled from "styled-components";
import { getUserProfile } from "../../api/profile/profile";
import ProfileCreationForm from "../../components/profileCreationForm/ProfileCreationForm";
import { useUser } from "../../context/UserContext";

const StyledProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledProfileInfoContainer = styled.div`
  border: solid black 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 8rem;
`;

const ProfilePage = () => {
  const { user, setUser } = useUser({});
  const profileData = getUserProfile();
  console.log(profileData);
  return (
    <StyledProfilePage>
      <h3>Profile</h3>
      {profileData.id === undefined ? (
        <ProfileCreationForm />
      ) : (
        <>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
          />
          <StyledProfileInfoContainer>
            <div>
              Name: {user.firstName} {user.lastName}
            </div>
            <div>E-mail: {user.email}</div>
            <button>edit profile</button>
          </StyledProfileInfoContainer>
        </>
      )}
    </StyledProfilePage>
  );
};

export default ProfilePage;
