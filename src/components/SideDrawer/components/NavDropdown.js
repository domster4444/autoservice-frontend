import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

// import { useParams } from "react-router-dom";

const NavDropdownContainer = styled.div`
  cursor: pointer;
  width: 100%;
`;

const NavDropdownTitle = styled.h6`
  color: var(--primary-blue);
  padding: 0.55rem;
  border-radius: 0.5rem;
  svg {
    fill: var(--primary-blue);
    font-size: 1.4rem;
  }
  &:hover {
    div,
    i {
      color: var(--primary-white);
    }

    background: var(--primary-blue);
    svg {
      fill: var(--primary-white);
    }
  }
`;

const AsideDropdown = styled.ul`
  margin-left: 0.5rem;
  border-left: 3px solid #a5d6f2;
  li {
    transition: all ease-in 200ms;
    border-left: 3px solid transparent;
    margin-top: 0.4rem;
    margin-left: -0.21rem;
    &:hover {
      border-left: 3px solid #0f5288;
    }
    &:active {
      transition: all ease-in 100ms;
    }
  }
`;

const NavDropdown = ({ title = "default menu title", linkArray = ["one", "two"], nameList = ["Create", "List"] }) => {
  const [AsideDropdownOpenState, setAsideDropdownOpenState] = useState(true);

  const toggleAsideDropdownOpenState = () => {
    setAsideDropdownOpenState(!AsideDropdownOpenState);
  };

  return (
    <NavDropdownContainer>
      <ul className='px-0'>
        <div onClick={toggleAsideDropdownOpenState}>
          <NavDropdownTitle className='d-flex align-items-center justify-content-between px-2'>
            <div>{title}</div>

            {(() => {
              if (AsideDropdownOpenState) {
                return <RiArrowDropDownLine className='text-black fs-3' />;
              } else {
                return <RiArrowDropUpLine className='text-black fs-3' />;
              }
            })()}
          </NavDropdownTitle>
        </div>
        {(() => {
          if (AsideDropdownOpenState) {
            return (
              <AsideDropdown className='list-unstyled '>
                {(() => {
                  return nameList.map((i, index) => {
                    return (
                      <Link key={index} className='text-decoration-none  text-primary-blue' to={`/${linkArray[index]}`}>
                        <li
                          // style={{
                          //   backgroundColor:
                          //     window.location.pathname ===
                          //     `/${linkArray[index]}`
                          //       ? "#0f5288"
                          //       : "",
                          // }}
                          className='ps-2'
                        >
                          {i}
                        </li>
                      </Link>
                    );
                  });
                })()}
              </AsideDropdown>
            );
          }
        })()}
      </ul>
    </NavDropdownContainer>
  );
};

export default NavDropdown;
