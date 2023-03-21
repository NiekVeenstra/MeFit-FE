import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import keycloak from "../../keycloak";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
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
    background-color: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.colors.white}!important;
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.4rem 0.7rem;

  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  console.log(user.isAdmin);
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
            <StyledNavLink onClick={handleCloseMenu} to="/">
              Start
            </StyledNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StyledNavLink onClick={handleCloseMenu} to="/dashboard">
              Dashboard
            </StyledNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StyledNavLink onClick={handleCloseMenu} to="/exercises">
              Exercises
            </StyledNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StyledNavLink onClick={handleCloseMenu} to="/profile">
              Profile
            </StyledNavLink>
          </DropdownMenuItem>
          {user.isAdmin && (
            <DropdownMenuItem>
              <StyledNavLink onClick={handleCloseMenu} to="/admin">
                Admin
              </StyledNavLink>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleLogoutClick}>
            <StyledNavLink>Logout</StyledNavLink>
          </DropdownMenuItem>
        </DropdownMenuContainer>
      )}
    </DropdownWrapper>
  );
};

export default DropdownMenu;
