import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "redux/api/users/userApi";

import { useGetUserByRoleQuery } from "redux/api/users/userApi";
import { useGetDashboardDataQuery } from "redux/api/dashboard/dashboardApi";

import { globalConstant } from "constant/constant";

// * components
import LineChart from "components/LineChart";
import VehicleCard from "components/VehicleCard";
import MechanicCarousel from "components/Carousel/MechanicCarousel";
import ReportCarousel from "components/Carousel/ReportCarousel";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

import { useGetVehicleQuery } from "redux/api/vehicle/vehicleApi";

const MechanicCarouselContainer = styled.div`
  width: 55vw;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
const ReportsCarouselContainer = styled.div`
  width: 25vw;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
const Admin = () => {
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
  useEffect(() => {
    if (roles.includes("user") && !roles.includes("mechanic") && !roles.includes("admin") && !roles.includes("receptionist")) {
      localStorage.removeItem("accessToken");
      window.location.href = "/user-not-allowed";
    }

    if (roles.includes("mechanic") && !roles.includes("user") && !roles.includes("admin") && !roles.includes("receptionist")) {
      window.location.href = "/service-list";
    }

    if (roles.includes("receptionist") && !roles.includes("user") && !roles.includes("admin") && !roles.includes("mechanic")) {
      window.location.href = "/service-list";
    }
  }, [roles]);

  const { data: mechanicData, isError: mechanicError, isLoading: mechanicLoading } = useGetUserByRoleQuery("mechanic");

  const { data: dashboardData, isError: isDashboardDataError, isLoading: isDashboardDataLoading } = useGetDashboardDataQuery();

  const { data: vehicleData, isLoading: vehicleLoading, isError: vehicleError } = useGetVehicleQuery();

  const [filterYear, setFilterYear] = useState(2023);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (mechanicLoading || isDashboardDataLoading) return <Loader />;
  if (mechanicError || isDashboardDataError) return <ErrorCard />;
  const yearlyChartData = {
    title: "Yearly vs Count Chart",
    data: dashboardData.data.yearly.map((item) => {
      return {
        name: item._id,
        vehicles: item.count,
      };
    }),
  };
  const monthlyChartData = {
    title: "Monthly vs Count Chart",
    data: dashboardData.data.monthly.map((item) => {
      //  only filter the current year data of 2023 where item._id.year must be 2023

      if (item._id.year === filterYear) {
        //  return based on sorted monthNames[item._id.month

        for (let i = 0; i < monthNames.length; i++) {
          if (i === item._id.month - 1) {
            return {
              name: monthNames[i],
              vehicles: item.count,
            };
          }
        }
      }
    }),
  };

  // get url
  const lastUrl = window.location.href.split("/")[window.location.href.split("/").length - 1];

  if (vehicleLoading) return <Loader />;

  if (vehicleError)
    return (
      <>
        <h1>Error while fetching vehicles</h1>
      </>
    );

  return (
    <DashboardContainer className='animate__animated animate__fadeInUp'>
      <select
        id='year'
        onChange={() => {
          // get the selected year
          const selectedYear = document.querySelector("#year").value;
          const numericYear = Number(selectedYear);
          setFilterYear(numericYear);
        }}
        style={{ width: "7rem" }}
        class=' form-select'
        aria-label='Default select example'
      >
        <option selected>Year</option>
        {(() => {
          const years = [];

          dashboardData.data.monthly.map((item) => {
            if (years.includes(item._id.year)) {
              return;
            } else {
              years.push(item._id.year);
            }
          });

          return years.map((year) => {
            return <option value={year}>{year}</option>;
          });
        })()}
      </select>
      <DashboardSection>
        <LeftSection style={{ height: "20rem" }}>
          <h6 className='my-2 text-primary-blue'>{lastUrl === "dashboard-monthly" ? monthlyChartData.title : yearlyChartData.title}</h6>
          <LineChart data={lastUrl === "dashboard-monthly" ? monthlyChartData.data : yearlyChartData.data} />
        </LeftSection>
        <RightSection>
          <h6 className='my-2 text-primary-blue'>Most visited vehicles</h6>

          {dashboardData.data.vehicles.map((item) => {
            const vehicleImage = vehicleData.data.find((vehicle) => vehicle.number === item.vehicle.number);

            return (
              <div className='my-2'>
                <VehicleCard
                  count={item.count}
                  carImg={`${globalConstant.serverUrl}/api/v1/download/vehicles/${vehicleImage.vehicle_image}`}
                  carName={item.vehicle.number}
                  carDescription={item.vehicle.type}
                  billBookFile={`${globalConstant.serverUrl}/api/v1/download/vehicles/${vehicleImage.bluebook}`}
                />
              </div>
            );
          })}
        </RightSection>
      </DashboardSection>
      <DashboardSection>
        <LeftSection>
          <h6 className='my-2 text-primary-blue mb-5'>Mechanics</h6>
          <MechanicCarouselContainer>
            <MechanicCarousel mechanicData={mechanicData} slidesToShow={mechanicData.length > 3 ? 3 : mechanicData.length} />
          </MechanicCarouselContainer>
        </LeftSection>
        <RightSection style={{ overflowX: "hidden" }}>
          <h6 className='my-2 text-primary-blue'>Reports</h6>

          <ReportsCarouselContainer>
            <ReportCarousel slidesToShow={2} />
          </ReportsCarouselContainer>
        </RightSection>
      </DashboardSection>
    </DashboardContainer>
  );
};

export default Admin;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  background-color: var(--primary-white);
  color: var(--primary-black);
  width: 65%;
  border-radius: 0.25rem;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

const RightSection = styled.div`
  height: 22rem;
  padding: 0.25rem;
  overflow-y: scroll;

  width: 34.5%;
  border-radius: 0.25rem;
  @media screen and (max-width: 768px) {
    width: 95%;
    margin-top: 0.75rem;
  }
`;
