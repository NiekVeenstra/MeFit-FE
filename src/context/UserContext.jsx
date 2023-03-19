import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const ProfileContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserProfile = () => {
  return useContext(ProfileContext);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const stateUser = {
    user,
    setUser,
  };

  const stateProfile = {
    userProfile,
    setUserProfile,
  };

  return (
    <UserContext.Provider value={stateUser}>
      <ProfileContext.Provider value={stateProfile}>
        {children}
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
