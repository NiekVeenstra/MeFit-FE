import React, { useEffect, useState } from "react";
import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 20px;
  font-size: 16px;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const PaginationButton = styled.button`
  margin: 5px;
`;

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const keycloakAdminGetUsers = () => {
    const adminClient = new KeycloakAdminClient({
      baseUrl: "https://lemur-3.cloud-iam.com/auth",
      realmName: "me-fit-app",
    });

    let execute = async () => {
      await adminClient.auth({
        username: "admin",
        password: "rTwELrALLIEjDdoU7yVD",
        grantType: "password",
        clientId: "me-fit-app",
      });

      const users = await adminClient.users.find();

      const usersWithRoles = await Promise.all(
        users.map(async (user) => {
          const roleMappings = await adminClient.users.listRoleMappings({
            id: user.id,
          });
          const allRoles = roleMappings.realmMappings || [];
          user.roles = allRoles.map((role) => role.name);
          return user;
        })
      );
      setUsers(usersWithRoles);
    };

    execute();
  };

  const keycloakAdminDeleteUser = async (userId) => {
    const adminClient = new KeycloakAdminClient({
      baseUrl: "https://lemur-3.cloud-iam.com/auth",
      realmName: "me-fit-app",
    });

    await adminClient.auth({
      username: "admin",
      password: "rTwELrALLIEjDdoU7yVD",
      grantType: "password",
      clientId: "me-fit-app",
    });

    await adminClient.users.del({ id: userId });

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const keycloakAdminUpdateUserRoles = async (userId, selectedRole) => {
    const adminClient = new KeycloakAdminClient({
      baseUrl: "https://lemur-3.cloud-iam.com/auth",
      realmName: "me-fit-app",
    });

    await adminClient.auth({
      username: "admin",
      password: "rTwELrALLIEjDdoU7yVD",
      grantType: "password",
      clientId: "me-fit-app",
    });

    const currentRoleMappings = await adminClient.users.listRoleMappings({ id: userId });
    const currentRealmRoleMappings = currentRoleMappings.realmMappings || [];
    const rolesToRemove = currentRealmRoleMappings.filter(
      (role) => role.name !== "USER" && role.name !== "default-roles-me-fit-app"
    );
    await adminClient.users.delRealmRoleMappings({
      id: userId,
      roles: rolesToRemove,
    });

    const realmRoles = await adminClient.roles.find();
    const newRoleMappings = realmRoles.filter(
      (role) =>
        role.name === "USER" ||
        role.name === "default-roles-me-fit-app" ||
        role.name === selectedRole
    );
    await adminClient.users.addRealmRoleMappings({
      id: userId,
      roles: newRoleMappings,
    });

    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            roles: [
              ...new Set([
                ...user.roles.filter(
                  (role) => role === "USER" || role === "default-roles-me-fit-app"
                ),
                selectedRole,
              ]),
            ],
          }
        : user
    );
    setUsers(updatedUsers);
  };

  useEffect(() => {
    keycloakAdminGetUsers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <PaginationButton key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </PaginationButton>
    );
  });

  return (
    <div>
      Admin Panel
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Username</StyledTh>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>Roles</StyledTh>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <StyledTd>{user.username}</StyledTd>
              <StyledTd>{user.firstName}</StyledTd>
              <StyledTd>{user.lastName}</StyledTd>
              <StyledTd>
                <select
                  value={JSON.stringify(
                    user.roles.filter(
                      (role) => role !== "USER" && role !== "default-roles-me-fit-app"
                    )
                  )}
                  onChange={(e) =>
                    keycloakAdminUpdateUserRoles(user.id, JSON.parse(e.target.value)[0])
                  }
                >
                  <option value="[]">User</option>
                  <option value='["CONTRIBUTOR"]'>Contributor</option>
                  <option value='["ADMIN"]'>Admin</option>
                </select>
              </StyledTd>
              <StyledTd>
                <button onClick={() => keycloakAdminDeleteUser(user.id)}>Delete</button>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div>{renderPageNumbers}</div>
    </div>
  );
};

export default AdminPage;
