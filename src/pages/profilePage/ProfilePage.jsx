import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { getUserProfiles } from "../../api/profile/profile";
import ProfileCreationForm from "../../components/profileCreationForm/ProfileCreationForm";
import { useUser, useUserCheck, useUserProfile } from "../../context/UserContext";
import { keycloakUpdateUserPassword } from "../adminPage/AdminPage";

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

  img {
    width: 1.3rem;
  }
`;

const StyledSvg = styled.svg`
  width: 1.3rem;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;

  h2 {
    margin-bottom: 1rem;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledModalContainer = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  margin-top: 1rem;
`

const StyledModalLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const StyledUpdateButton = styled(DeleteButton)`
  margin-top: 1rem;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ProfilePage = () => {
  const { user } = useUser({});
  const { userProfile, setUserProfile } = useUserProfile({});
  const { userCheck, setUserCheck } = useUserCheck(true);
  const [isHovered, setIsHovered] = useState(false);

  const [updateImage, setUpdateImage] = useState(true);

  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [userToUpdatePassword, setUserToUpdatePassword] = useState(null);

  // const getUserData = async () => {
  //   const getUserProfilesData = await getUserProfiles();
  //   const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
  //   setUserProfile(checkNum);
  //   setUserCheck(checkNum.length === 0);
  // };

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 8;

    return hasCapitalLetter && hasNumber && hasSpecialCharacter && hasMinimumLength;
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword === confirmPassword) {
      if (validatePassword(newPassword)) {
        keycloakUpdateUserPassword(userToUpdatePassword, newPassword);
        setShowUpdatePasswordModal(false);
      } else {
        alert(
          "Password must contain at least one capital letter and one number and one special character and be at least 8 characters long."
        );
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  const getUserData = useCallback(async () => {
    const getUserProfilesData = await getUserProfiles();
    const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
    setUserProfile(checkNum);
    setUserCheck(checkNum.length === 0);
  }, [user, setUserProfile, setUserCheck]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

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
              <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M447.5 224H456c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L397.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L311 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H447.5z" />
              </StyledSvg>
            </StyledReloadButton>
            <div>
              Name: {user?.firstName} {user?.lastName}
            </div>
            <div>E-mail: {user?.email}</div>
            <div>Height: {userProfile[0]?.height}cm</div>
            <div>Weight: {userProfile[0]?.weight}kg</div>
            <div>Disabilities: {userProfile[0]?.disabilities}</div>
            <div>Medical Conditions: {userProfile[0]?.medicalConditions}</div>
            <StyledButtonContainer>
              <StyledButton onClick={() => setUserCheck(true)}>Edit Profile</StyledButton>
              <StyledButton
                onClick={() => {
                  setShowUpdatePasswordModal(true);
                  setUserToUpdatePassword(user.id);
                }}
              >
                Update Password
              </StyledButton>
            </StyledButtonContainer>
          </StyledProfileInfoContainer>
        </StyledUserProfileContainer>
      )}
      {userToUpdatePassword && (
        <Modal show={showUpdatePasswordModal}>
          <ModalContent>
            <CloseButton onClick={() => setShowUpdatePasswordModal(false)}>&times;</CloseButton>
            <h2>Update Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <StyledModalContainer>
                <StyledModalLabel>
                  New Password:
                  <input type="password" name="newPassword" required />
                </StyledModalLabel>
                <br />
                <StyledModalLabel>
                  Confirm New Password:
                  <input type="password" name="confirmPassword" required />
                </StyledModalLabel>
              </StyledModalContainer>
              <br />
              <StyledUpdateButton type="submit">Update Password</StyledUpdateButton>
            </form>
          </ModalContent>
        </Modal>
      )}
    </StyledProfilePage>
  );
};

export default ProfilePage;
