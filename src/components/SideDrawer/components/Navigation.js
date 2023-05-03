import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavDropdown from "./NavDropdown";
import { useGetSingleUserQuery } from "redux/api/users/userApi";

const Navigation = () => {
  const [name, setName] = useState("");
  const [roles, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  const loggedUser = useSelector((state) => state.loggedUser);
  const { data: loggedInUserDetails, isLoading, isError, error } = useGetSingleUserQuery(loggedUser.user._id);

  useEffect(() => {
    if (loggedInUserDetails) {
      setName(loggedInUserDetails.data.name);
      setRole(loggedInUserDetails.data.roles);
      setAvatar(loggedInUserDetails.data.avatar);
    }
  }, [loggedInUserDetails]);

  return (
    <aside id='dashboard-aside' className='p-3'>
      <h4 className='text-primary-blue'> NAVIGATION </h4>
      <hr />

      {(() => {
        if (roles.includes("admin")) {
          return <NavDropdown title='Dashboard' linkArray={["dashboard-monthly", "dashboard-yearly"]} nameList={["Monthly", "Yearly"]} />;
        }
      })()}

      <NavDropdown title='Request' linkArray={["service-create", "service-list"]} nameList={["Create", "List"]} />

      {(() => {
        if (roles.includes("admin")) {
          return (
            <>
              <NavDropdown title='Vehicle' linkArray={["vehicle-create", "vehicle-list"]} nameList={["Create", "List"]} />
              <NavDropdown title='Categories' linkArray={["category-create", "category-list"]} nameList={["Create", "List"]} />
              <NavDropdown title='Organization' linkArray={["organization-create", "organization-list"]} nameList={["Create", "List"]} />
              <NavDropdown title='Users' linkArray={["users-client", "users-mechanics", "users-admin", "users-receptionist", "users-create"]} nameList={["Clients", "Mechanics", "Admin", "Receptionist", "Create User"]} />
              <NavDropdown title='Employee' linkArray={["employee-create", "employee-list"]} nameList={["Create ", "List "]} />
            </>
          );
        }
      })()}
    </aside>
  );
};

export default Navigation;
