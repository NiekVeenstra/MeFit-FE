import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const ProfileContext = createContext();
const UserCheck = createContext();
const GoalsContext = createContext();
const ListCheck = createContext();
const workout = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserProfile = () => {
  return useContext(ProfileContext);
};

export const useUserCheck = () => {
  return useContext(UserCheck);
};

export const useGoals = () => {
  return useContext(GoalsContext);
};

export const useListCheck = () => {
  return useContext(ListCheck);
};

export const useWorkout = () => {
  return useContext(workout);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userCheck, setUserCheck] = useState(true);
  const [oneGoal, setOneGoal] = useState();
  const [listWorkout, setListWorkout] = useState(false);
  const [saveWorkout, setSaveWorkout] = useState([]);

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

  const stateOneGoal = {
    oneGoal,
    setOneGoal,
  };

  const stateListCheck = {
    listWorkout,
    setListWorkout,
  };

  const stateSaveWorkout = {
    saveWorkout,
    setSaveWorkout,
  };

  return (
    <UserContext.Provider value={stateUser}>
      <ProfileContext.Provider value={stateProfile}>
        <UserCheck.Provider value={userCheckProfile}>
          <GoalsContext.Provider value={stateOneGoal}>
            <ListCheck.Provider value={stateListCheck}>
              <workout.Provider value={stateSaveWorkout}>
                {children}
              </workout.Provider>
            </ListCheck.Provider>
          </GoalsContext.Provider>
        </UserCheck.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
