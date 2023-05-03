import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalConstant } from "constant/constant";
import { useGetSingleUserQuery } from "redux/api/users/userApi";
import { useNavigate } from "react-router-dom";

//* IMPORT COMPONENTS

import MenuDropdown from "components/Dropdown/MenuDropdown";
import Avatar from "Avatar";

// ? STYLING STARTS FROM HERE
import styled from "styled-components";

//* Import assets
import Logo from "assets/images/logo/autoservice-logo.png";

const NavBar = styled.nav`
  padding: 0.55rem 0.75rem;

  display: flex;
  margin: 0.5rem 0.85rem;
  border-radius: 1rem;
  align-items: center;
  ul {
    margin-bottom: 0;
    width: 100%;
    padding-left: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo__container {
      img.nav__logo {
        height: 2rem;
      }
    }
    .menu__container {
      display: flex;
      align-items: center;
      .menu__list {
        list-style: none;
        color: white;

        .menu-item {
          cursor: pointer;
          margin: 1rem;
          text-decoration: none;
          color: var(--primary-white);
        }
      }
    }
  }
`;

const Toolbar = ({ menus }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { data: loggedInUserDetails, isLoading, isError, error } = useGetSingleUserQuery(loggedUser.user._id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    /* This code block is checking if there is an error with the API call and if the error status is 401
(Unauthorized), it removes the access token from the local storage and redirects the user to the
homepage ("/"). This is a security measure to prevent unauthorized access to protected routes. */
    if (error.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  }

  const { name, roles, avatar } = loggedInUserDetails.data;

  if (roles.includes("user")) {
    localStorage.removeItem("accessToken");
    window.location.href = "/user-not-allowed";
  }

  return (
    <header className='roboto_regular '>
      <NavBar className='gradient__animation'>
        <ul>
          <li className='logo__container'>
            <img src={Logo} alt='autoservice' className='nav__logo' />
          </li>
          <li className='menu__container'>
            <ul className='menu__list'>
              {(() => {
                return menus.map((menu, index) => {
                  return (
                    <>
                      <Link className='menu-item' key={index} to={menu.path}>
                        {menu.menuName}
                      </Link>
                    </>
                  );
                });
              })()}

              <li>
                <MenuDropdown>
                  <Avatar
                    name={name}
                    role={roles}
                    url={`${globalConstant.serverUrl}/storage/profile_pics/${avatar}
                  `}
                  />
                </MenuDropdown>
              </li>
            </ul>
          </li>
        </ul>
      </NavBar>
    </header>
  );
};

export default Toolbar;
