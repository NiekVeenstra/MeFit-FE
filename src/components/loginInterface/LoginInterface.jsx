import React from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";

const StyledLoginInterface = styled.div`
border: solid red 5px;
`;

const LoginInterface = () => {
  return (
    <StyledLoginInterface>
      <h2>Log in to your account</h2>
      <div style={{ border: "solid red 1px" }}>
        <section>
          {!keycloak.authenticated && <button onClick={() => keycloak.login()}>Login</button>}
          {/* {keycloak.authenticated && <button onClick={() => keycloak.logout()}>Logout</button>} */}
        </section>

        {keycloak.token && (
          <div>
            <h4>Token</h4>
            <pre>{keycloak.token}</pre>
            <button onClick={() => console.log(keycloak)}>check</button>
          </div>
        )}
      </div>
    </StyledLoginInterface>
  );
};

export default LoginInterface;
