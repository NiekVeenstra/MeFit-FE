import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const ProfileContext = createContext();
const UserCheck = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserProfile = () => {
  return useContext(ProfileContext);
};

export const useUserCheck = () => {
  return useContext(UserCheck);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userCheck, setUserCheck] = useState(true);

  const stateUser = {
    user,
    setUser,
  };

  const stateProfile = {
    userProfile,
    setUserProfile,
  };

  const userCheckProfile = {
    userCheck,
    setUserCheck,
  };

  return (
    <UserContext.Provider value={stateUser}>
      <ProfileContext.Provider value={stateProfile}>
        <UserCheck.Provider value={userCheckProfile}>
          {children}
        </UserCheck.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
