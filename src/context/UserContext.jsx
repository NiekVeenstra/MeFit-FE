import { createContext, useContext, useState } from "react";


const UserContext = createContext();
const ProfileContext = createContext();
const GoalsContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserProfile = () => {
  return useContext(ProfileContext);
};

export const useGoals = () => {
  return useContext(GoalsContext);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [oneGoal, setOneGoal] = useState();

  const stateUser = {
    user,
    setUser,
  };

  const stateProfile = {
    userProfile,
    setUserProfile,
  };

  const stateOneGoal = {
    oneGoal,
    setOneGoal,
  };

  return (
    <UserContext.Provider value={stateUser}>
      <ProfileContext.Provider value={stateProfile}>
        <GoalsContext.Provider value={stateOneGoal}>
          {children}
        </GoalsContext.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
