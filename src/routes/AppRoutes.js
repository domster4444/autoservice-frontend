import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import LoggedInPrivateRoute from "routes/LoggedInPrivateRoute";

// import { useTranslation } from "react-i18next";

// * import data
// import { chartData as monthlyChartData } from "library/chartData/monthly";
// import { chartData as yearlyChartData } from "library/chartData/yearly";

//* import layout
import Layout from "components/DashboardLayout";

// *pages
import Login from "Pages/Login";
import PageNotFound from "Pages/PageNotFound";
import UserNotAllowed from "Pages/UsersNotAllowed";
import Chat from "Pages/Chat/Home";
import ChatLogin from "Pages/Chat/Login";
import ChatRegister from "Pages/Chat/Register";

// ? include styling
import "styles/scss/globals.css";
import ForgotPassword from "Pages/ForgotPassword";
import AdminHome from "Pages/Dashboard/Admin/AdminHome";

import ServiceCreate from "Pages/Dashboard/Admin/ServiceRequest/Create";
import SolutionCreate from "Pages/Dashboard/Admin/Solutions/Create/Create";
import SolutionUpdate from "Pages/Dashboard/Admin/Solutions/Update/Update";
import SolutionView from "Pages/Dashboard/Admin/Solutions/View";

import VehicleCreate from "Pages/Dashboard/Admin/Vehicle/Create";
import CategoryCreate from "Pages/Dashboard/Admin/Category/Create";
import OrganizationCreate from "Pages/Dashboard/Admin/Organization/Create";
import EmployeeCreate from "Pages/Dashboard/Admin/Employee/Create";
import EmployeeList from "Pages/Dashboard/Admin/Employee/List";

import ServiceRequestList from "Pages/Dashboard/Admin/ServiceRequest/List";
import ServiceRequestView from "Pages/Dashboard/Admin/ServiceRequest/View";
import ServiceRequestUpdate from "Pages/Dashboard/Admin/ServiceRequest/Update";
import VehicleList from "Pages/Dashboard/Admin/Vehicle/List";
import VehicleUpdate from "Pages/Dashboard/Admin/Vehicle/Update";
import EmployeeUpdate from "Pages/Dashboard/Admin/Employee/Update";
import CategoryList from "Pages/Dashboard/Admin/Category/List";
import CategoryUpdate from "Pages/Dashboard/Admin/Category/Update";
import OrganizationList from "Pages/Dashboard/Admin/Organization/List";
import OrganizationUpdate from "Pages/Dashboard/Admin/Organization/Update";
import ContractUpdate from "Pages/Dashboard/Admin/Organization/Contracts/Update";
import UserUpdate from "Pages/Dashboard/Admin/Users/Update";
import UserView from "Pages/Dashboard/Admin/Users/View";
import ClientList from "Pages/Dashboard/Admin/Users/Client/List";
import MechanicList from "Pages/Dashboard/Admin/Users/Mechanic/List";
import AdminList from "Pages/Dashboard/Admin/Users/Admin/List";
import ReceptionistList from "Pages/Dashboard/Admin/Users/Receptionist/List";
import UserCreate from "Pages/Dashboard/Admin/Users/Create";
import ChangePassword from "Pages/ChangePassword/ChangePassword";

const DashboardToolbarMenus = [];

function App() {
  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/api/v1/forgot-password/admin/change/:id' element={<ChangePassword />} />
          //* Dashboard Routes
          <Route
            path='/dashboard-monthly'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Dashboard"} path={["Admin", "Home"]}>
                  <AdminHome />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/dashboard-yearly'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Dashboard"} path={["Admin", "Home"]}>
                  <AdminHome />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* Service Routes
          <Route
            path='/service-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Service Request"} path={["Dashboard", "Create Service Request"]}>
                  <ServiceCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/service-list'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Service Request"} path={["Dashboard", "Service List"]}>
                  <ServiceRequestList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/service-view/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"View Service"} path={["Dashboard", "View Service"]}>
                  <ServiceRequestView />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/service-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Service Request"} path={["Dashboard", "Service List"]}>
                  <ServiceRequestUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/solution-create/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Create Solution"} path={["Dashboard", "Create Solution"]}>
                  <SolutionCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/solution-update/:id/:srid'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Update Solution"} path={["Dashboard", "Update Solution"]}>
                  <SolutionUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/solution-view/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"View Solution"} path={["Dashboard", "View Solution"]}>
                  <SolutionView />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* Chat
          <Route path='/chat' element={<Chat />} />
          <Route path='/chat-register' element={<ChatRegister />} />
          <Route
            path='/chat-login'
            element={
              // <LoggedInPrivateRoute>
              // <Layout menus={DashboardToolbarMenus} pageTitle={"Vehicle Create"} path={["Dashboard", "Create Vehicle"]}>
              <ChatLogin />
              // </Layout>
              // </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/vehicle-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Vehicle Create"} path={["Dashboard", "Create Vehicle"]}>
                  <VehicleCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/vehicle-list'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Vehicle List"} path={["Dashboard", "Vehicle List"]}>
                  <VehicleList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/vehicle-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Vehicle Update"} path={["Dashboard", "Vehicle Update"]}>
                  <VehicleUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* Employee Routes
          <Route
            path='/employee-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Create Employee"} path={["Dashboard", "Create Employee"]}>
                  <EmployeeCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/employee-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Update Employee"} path={["Dashboard", "Update Employee"]}>
                  <EmployeeUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/employee-list'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"List Employee"} path={["Dashboard", "List Employee"]}>
                  <EmployeeList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* Category Routes
          <Route
            path='/category-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Create Category"} path={["Dashboard", "Create Category"]}>
                  <CategoryCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/category-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Update Category"} path={["Dashboard", "Update Category"]}>
                  <CategoryUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/category-list'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Category List"} path={["Dashboard", "Category List"]}>
                  <CategoryList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* Organization Routes
          <Route
            path='/organization-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Organization"} path={["Dashboard", "Create Organization"]}>
                  <OrganizationCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/organization-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Organization"} path={["Dashboard", "Update Organization"]}>
                  <OrganizationUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/organization-list'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Organization"} path={["Dashboard", "Organization List"]}>
                  <OrganizationList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/contract-update/:id/:orgId'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Organization"} path={["Dashboard", "Organization List"]}>
                  <ContractUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          //* User Routes
          {/* //? users client */}
          <Route
            path='/users-update/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Update Users"} path={["Dashboard", "Update Users"]}>
                  <UserUpdate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/users-view/:id'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"User Detail"} path={["Dashboard", "User Detail"]}>
                  <UserView />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/users-create'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Create Users"} path={["Dashboard", "Create Users"]}>
                  <UserCreate />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route
            path='/users-client'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Client"} path={["Dashboard", "Client Users"]}>
                  <ClientList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          {/* //? users mechanics */}
          <Route
            path='/users-mechanics'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Mechanic"} path={["Dashboard", "Mechanic Users"]}>
                  <MechanicList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          {/* //? users admin */}
          <Route
            path='/users-admin'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Admin"} path={["Dashboard", "Admin Users"]}>
                  <AdminList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          {/* //? users admin */}
          <Route
            path='/users-receptionist'
            element={
              <LoggedInPrivateRoute>
                <Layout menus={DashboardToolbarMenus} pageTitle={"Admin"} path={["Dashboard", "Admin Users"]}>
                  <ReceptionistList />
                </Layout>
              </LoggedInPrivateRoute>
            }
          />
          <Route path='/user-not-allowed' element={<UserNotAllowed />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
