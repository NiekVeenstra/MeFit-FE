import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import keycloak from "../../keycloak";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  //border: 0.1rem solid ${(props) => props.theme.colors.black};
  border-radius: 15px;
  cursor: pointer;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
`;

const DropdownMenuContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.7rem;
  border: 0.1rem solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  width: 100%;
`;

const DropdownMenuItem = styled.li`
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColorActive};
    color: ${(props) => props.theme.colors.white};
  }
`;

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    if (window.confirm("Are you sure you want to logout?")) {
      keycloak.logout();
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <DropdownWrapper>
      <DropdownToggle onClick={toggleDropdown}>Menu</DropdownToggle>
      {isOpen && (
        <DropdownMenuContainer>
          <DropdownMenuItem>
            <NavLink onClick={handleCloseMenu} to="/">
              Start
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink onClick={handleCloseMenu} to="/user">
              User
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink onClick={handleCloseMenu} to="/admin">
              Admin
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>
        </DropdownMenuContainer>
      )}
    </DropdownWrapper>
  );
};

export default DropdownMenu;
