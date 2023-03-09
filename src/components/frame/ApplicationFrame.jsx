import React from "react";
import DropdownMenu from "../navbar/DropdownMenu";
import decode from "jwt-decode";
import keycloak from "../../keycloak";

const ApplicationFrame = () => {
  const decodedToken = decode(keycloak.token);
  const userName = decodedToken.name;

  return (
    <div>
      <h1>MeFit</h1>
      <div>
        <img src="" alt="" />
        <h3>{userName}</h3>
      </div>
      <DropdownMenu />
    </div>
  );
};

export default ApplicationFrame;
