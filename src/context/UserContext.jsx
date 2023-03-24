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
        <UserCheck.Provider value={userCheckProfile}>{children}</UserCheck.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
