import React from "react";
import ProfileCreationForm from "../../components/profileCreationForm/ProfileCreationForm";
import { useUser } from "../../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useUser({});
  return (
    <>
      <h3>Profile</h3>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        alt=""
      />
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>{user.email}</div>
      <button>edit profile</button>

      <ProfileCreationForm />
    </>
  );
};

export default ProfilePage;
