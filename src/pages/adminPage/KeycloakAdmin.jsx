import React, { useEffect } from "react";
import KcAdminClient from "@keycloak/keycloak-admin-client";
import KeycloakAdminClient from "@keycloak/keycloak-admin-client";

const KeycloakAdmin = () => {
  const adminClient = new KcAdminClient({
    baseUrl: "https://lemur-3.cloud-iam.com/auth",
    realmName: "me-fit-app",
  });

  let execute = async () => {
    await KeycloakAdminClient.auth({
      username: "admin",
      password: "rTwELrALLIEjDdoU7yVD",
      grantType: "password",
      clientId: "nodejs-admin-client",
    });

    const users = await KeycloakAdmin.users.find();

    console.log(users);
  };
};

export default KeycloakAdmin;
