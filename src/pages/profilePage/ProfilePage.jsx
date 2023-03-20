import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserProfile, getUserProfiles, updateUserProfile } from "../../api/profile/profile";
import ProfileCreationForm from "../../components/profileCreationForm/ProfileCreationForm";
import { useUser, useUserCheck, useUserProfile } from "../../context/UserContext";

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
  const { user } = useUser({});
  const { userProfile } = useUserProfile({});

  const { userCheck, setUserCheck } = useUserCheck(true);

  const getUserData = async () => {
    const getUserProfilesData = await getUserProfiles();
    const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
    setUserCheck(checkNum.length === 0);
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
              <button onClick={() => setUserCheck(true)}>edit profile</button>
              <button
                onClick={() =>
                  updateUserProfile(user, {
                    weight: 100,
                    height: 100,
                    medicalConditions: "medicalConditions",
                    disabilities: "disabilities",
                    userId: 101,
                    address: {
                      addressLine1: "addressLine1",
                      addressLine2: "string",
                      addressLine3: "string",
                      postalCode: "postalCode",
                      city: "city",
                      country: "country",
                    },
                  })
                }
              >
                test
              </button>
            </StyledProfileInfoContainer>
          </>
        )
      }
    </StyledProfilePage>
  );
};

export default ProfilePage;
