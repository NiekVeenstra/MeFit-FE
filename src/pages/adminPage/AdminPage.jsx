import React, { useEffect, useState } from "react";
import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import styled from "styled-components";

const kCUsername = process.env.REACT_APP_KC_ADMIN_USERNAME;
const kCPassword = process.env.REACT_APP_KC_ADMIN_PASSWORD;
const kCGrantType = process.env.REACT_APP_KC_ADMIN_GRANTTYPE;
const kCClientId = process.env.REACT_APP_KC_ADMIN_CLIENTID;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 20px;
  font-size: 16px;
  width: 100%;
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
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #3e8e41;
  }
`;

const DeleteButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const Select = styled.select`
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #ddd;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.mainColor};
    box-shadow: 0 0 5px ${(props) => props.theme.colors.mainColor};
  }
`;

const AdminPanel = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        username: `${kCUsername}`,
        password: `${kCPassword}`,
        grantType: `${kCGrantType}`,
        clientId: `${kCClientId}`,
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
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (!confirmation) {
      return;
    }

    const adminClient = new KeycloakAdminClient({
      baseUrl: "https://lemur-3.cloud-iam.com/auth",
      realmName: "me-fit-app",
    });

    await adminClient.auth({
      username: `${kCUsername}`,
      password: `${kCPassword}`,
      grantType: `${kCGrantType}`,
      clientId: `${kCClientId}`,
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
      username: `${kCUsername}`,
      password: `${kCPassword}`,
      grantType: `${kCGrantType}`,
      clientId: `${kCClientId}`,
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
    <AdminPanel>
      <StyledTitle>Admin Panel</StyledTitle>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Username</StyledTh>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>Roles</StyledTh>
            <StyledTh>Delete</StyledTh>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <StyledTd>{user.username}</StyledTd>
              <StyledTd>{user.firstName}</StyledTd>
              <StyledTd>{user.lastName}</StyledTd>
              <StyledTd>
                <Select
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
                </Select>
              </StyledTd>
              <StyledTd>
                <DeleteButton onClick={() => keycloakAdminDeleteUser(user.id)}>Delete</DeleteButton>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div>{renderPageNumbers}</div>
    </AdminPanel>
  );
};

export default AdminPage;
