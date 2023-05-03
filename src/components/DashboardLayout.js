import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "redux/api/users/userApi";

//* Component Import
import Toolbar from "components/Toolbar";
import SideDrawer from "./SideDrawer";
import Breadcrumb from "components/Breadcrumb";
import FeaturedLeaf from "./FeaturedLeaf";

// use useEffect

const Layout = ({ menus, pageTitle, path, children }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const { data: loggedInUserDetails, isError, error } = useGetSingleUserQuery(loggedUser.user._id);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }

    if (loggedInUserDetails) {
      const loggedUserDetails = loggedInUserDetails.data;
      const { name, phone_number, roles } = loggedUserDetails;

      // if role includes mechanic then show chat
      if (roles.includes("mechanic")) {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "a963342c-2723-4837-adae-7d037003bdec";
        (function () {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementById("chat-container").appendChild(s);
          // set name
          window.$crisp.push(["set", "user:nickname", [name]]);
        })();
      }
    }
  }, [loggedInUserDetails]);
  return (
    <>
      <div className='db-body-bg'>
        <Toolbar menus={menus} />

        <main className='d-flex mt-3'>
          <div id='dashboard-aside' className='dashboard-left ms-3'>
            <SideDrawer />
          </div>

          <div id='dashboard-body' className='dashboard-right position-relative mx-3 rounded-2  p-3'>
            <FeaturedLeaf>
              <i className='bx bx-category-alt text-white'></i>
            </FeaturedLeaf>
            <h4 className='my-2 ms-4 text-primary-blue dashboard-body-title'>{pageTitle}</h4>
            <Breadcrumb tagArray={path} />
            {children}
          </div>
        </main>

        <section id='chat-container'></section>
      </div>
    </>
  );
};

export default Layout;
