import { createContext, useContext, useState } from "react";


const UserContext = createContext();
const ProfileContext = createContext();
const UserCheck = createContext();
const GoalsContext = createContext();


export const useUser = () => {
  return useContext(UserContext);
};

export const useUserProfile = () => {
  return useContext(ProfileContext);
};


export const useUserCheck = () => {
  return useContext(UserCheck);

export const useGoals = () => {
  return useContext(GoalsContext);

};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userProfile, setUserProfile] = useState(
  //   {
  //   weight: "100",
  //   height: "100",
  //   medicalConditions: "none",
  //   disabilities: "none",
  //   userId: null,
  //   address: {
  //     addressLine1: "none",
  //     addressLine2: "none",
  //     addressLine3: "none",
  //     postalCode: "none",
  //     city: "none",
  //     country: "none",
  //   },
  // }
  null
  );
  const [userCheck, setUserCheck] = useState(true);

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


  const userCheckProfile = {
    userCheck,
    setUserCheck,

  const stateOneGoal = {
    oneGoal,
    setOneGoal,
  };

  return (
    <UserContext.Provider value={stateUser}>
      <ProfileContext.Provider value={stateProfile}>
        <UserCheck.Provider value={userCheckProfile}>{children}</UserCheck.Provider>
        <GoalsContext.Provider value={stateOneGoal}>
          {children}
        </GoalsContext.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
