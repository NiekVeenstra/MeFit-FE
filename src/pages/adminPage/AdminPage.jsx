// import React, { useEffect, useState } from "react";
// import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
// import KeycloakAdmin from "./KeycloakAdmin";
// import styled from "styled-components";

// const StyledTable = styled.table`
//   border-collapse: collapse;
//   margin: 20px;
//   font-size: 16px;
// `;

// const StyledTh = styled.th`
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: left;
//   background-color: #f2f2f2;
// `;

// const StyledTd = styled.td`
//   border: 1px solid #ddd;
//   padding: 8px;
// `;

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);

//   const KeycloakAdmin = () => {
//     const adminClient = new KeycloakAdminClient({
//       baseUrl: "https://lemur-3.cloud-iam.com/auth",
//       realmName: "me-fit-app",
//     });

//     let execute = async () => {
//       await adminClient.auth({
//         username: "admin",
//         password: "rTwELrALLIEjDdoU7yVD",
//         grantType: "password",
//         clientId: "me-fit-app",
//       });

//       const users = await adminClient.users.find();

//       console.log(users);
//       setUsers(users);
//     };

//     execute();
//   };

//   useEffect(() => {
//     KeycloakAdmin()
//   }, [KeycloakAdmin])
  

//   return (
//     <div>
//       Admin Panel
//       <StyledTable>
//         <thead>
//           <tr>
//             <StyledTh>Username</StyledTh>
//             <StyledTh>First Name</StyledTh>
//             <StyledTh>Last Name</StyledTh>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <StyledTd>{user.username}</StyledTd>
//               <StyledTd>{user.firstName}</StyledTd>
//               <StyledTd>{user.lastName}</StyledTd>
//             </tr>
//           ))}
//         </tbody>
//       </StyledTable>
//     </div>
//   );
// };

// export default AdminPage;

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

  const KeycloakAdmin = () => {
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

      console.log(users);
      setUsers(users);
    };

    execute();
  };

  useEffect(() => {
    KeycloakAdmin()
  }, [KeycloakAdmin])
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <PaginationButton
        key={number}
        onClick={() => setCurrentPage(number)}
      >
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
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <StyledTd>{user.username}</StyledTd>
              <StyledTd>{user.firstName}</StyledTd>
              <StyledTd>{user.lastName}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div>
        {renderPageNumbers}
      </div>
    </div>
  );
};

export default AdminPage;