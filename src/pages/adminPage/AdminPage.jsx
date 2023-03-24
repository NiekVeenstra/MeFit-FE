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

  @media screen and (max-width: 767px) {
    display: block;
    width: 90%;
    thead,
    tbody {
      display: block;
      width: 100%;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      display: block;
      margin-bottom: 0.625em;
    }
    td {
      display: block;
      text-align: right;
      position: relative;
      padding-left: 50%;
    }
    td:before {
      content: attr(data-label);
      display: block;
      text-align: left;
      font-weight: bold;
      position: absolute;
      left: 6px;
      top: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const TableContainer = styled.div`
  /* overflow-x: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StyledUpdateButton = styled(DeleteButton)`
 margin-top: 1rem;
`

const UpdatePasswordButton = styled(DeleteButton)`
  width:9rem;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;

  h2{
    margin-bottom: 1rem;
  }
`;

const StyledModalLabel = styled.label`
`

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
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
  display: flex;
  flex-direction: column;
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

export const keycloakUpdateUserEmail = async (userId, newEmail) => {
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

  await adminClient.users.update(
    { id: userId },
    {
      email: newEmail,
    }
  );
};

export const keycloakUpdateUserPassword = async (userId, newPassword) => {
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

  await adminClient.users.resetPassword({
    id: userId,
    credential: {
      temporary: false,
      type: "password",
      value: newPassword,
    },
  });
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [userToUpdatePassword, setUserToUpdatePassword] = useState(null);

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

  const keycloakAdminUpdateUserPassword = async (userId, newPassword) => {
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

    await adminClient.users.resetPassword({
      id: userId,
      credential: {
        temporary: false,
        type: "password",
        value: newPassword,
      },
    });
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
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Username</StyledTh>
              <StyledTh>First Name</StyledTh>
              <StyledTh>Last Name</StyledTh>
              <StyledTh>Roles</StyledTh>
              <StyledTh>E-mail</StyledTh>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id}>
                <StyledTd data-label="Username">{user.username}</StyledTd>
                <StyledTd data-label="First Name">{user.firstName}</StyledTd>
                <StyledTd data-label="Last Name">{user.lastName}</StyledTd>
                <StyledTd data-label="Last Name">{user.email}</StyledTd>
                <StyledTd data-label="Roles">
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
                <StyledTd data-label="Update Password">
                  <UpdatePasswordButton
                    onClick={() => {
                      setShowUpdatePasswordModal(true);
                      setUserToUpdatePassword(user.id);
                    }}
                  >
                    Update Password
                  </UpdatePasswordButton>
                </StyledTd>
                <StyledTd data-label="Delete">
                  <DeleteButton onClick={() => keycloakAdminDeleteUser(user.id)}>
                    Delete
                  </DeleteButton>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <div>{renderPageNumbers}</div>
      {userToUpdatePassword && (
        <Modal show={showUpdatePasswordModal}>
          <ModalContent>
            <CloseButton onClick={() => setShowUpdatePasswordModal(false)}>&times;</CloseButton>
            <h2>Update Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                keycloakAdminUpdateUserPassword(userToUpdatePassword, e.target.newPassword.value);
                setShowUpdatePasswordModal(false);
              }}
            >
              <StyledModalLabel>
                New Password:
                <input type="password" name="newPassword" required />
              </StyledModalLabel>
              <br />
              <StyledUpdateButton type="submit">Update Password</StyledUpdateButton>
            </form>
          </ModalContent>
        </Modal>
      )}
    </AdminPanel>
  );
};

export default AdminPage;
