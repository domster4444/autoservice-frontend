import React, { useState } from "react";
import Select from "components/Select";
import toastMsg from "library/utilities/toastMsg";
import { useReducer } from "react";

import { VehicleApiService } from "services/vehicle/VehicleService";
import { useGetUserQuery } from "redux/api/users/userApi";
import { useGetOrganizationQuery } from "redux/api/organization/organizationApi";

import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

const Create = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("personal");
  const [blueBookFile, setBlueBookFile] = useState(null);
  const [vehicleImageFile, setVehicleImageFile] = useState(null);
  const [identityNumber, setIdentityNumber] = useState("");
  const [model, setModel] = useState("");

  /* //* ----------------------------------------- Select Signifinicant codes lies here STARTS */
  const { data: users, isLoading: userLoading, isError: isErrorFetchingUsers } = useGetUserQuery();
  const { data: organizations, isLoading: isOrgLoading, isError: isErrorFetchingOrg } = useGetOrganizationQuery();

  let initialSelectedUser = [];
  let initialSelectedOrganization = [];
  let initialOptionsToSelectUser;
  if (users) {
    initialOptionsToSelectUser = users.data.map((user) => {
      return { value: user._id, label: user.name };
    });
  }

  let initialOptionsToSelectOrganization;
  if (organizations) {
    initialOptionsToSelectOrganization = organizations.data.map((organization) => {
      return { value: organization._id, label: organization.name };
    });
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_USER":
        return action.payload;
      case "SET_SELECTED_ORGANIZATION":
        return action.payload;

      default:
        return state;
    }
  };

  const [selectedUser, dispatch] = useReducer(reducer, initialSelectedUser);
  const [selectedOrganization, dispatchOrganization] = useReducer(reducer, initialSelectedOrganization);

  if (userLoading || isOrgLoading) return <Loader />;
  if (isErrorFetchingUsers || isErrorFetchingOrg) return <ErrorCard />;

  /* //* --------------------------------------------------------- Select Signifinicant codes lies here ENDS */

  // //! HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    const personalVehicleDataToSubmit = {
      number: vehicleNumber,
      type: vehicleType,
      user_id: selectedUser.value,
      bluebook: blueBookFile,
      vehicle_image: vehicleImageFile,
      identity_number: identityNumber,
      model: model,
    };

    const organizationalVehicleDataToSubmit = {
      number: vehicleNumber,
      type: vehicleType,
      organization_id: selectedOrganization.value,
      bluebook: blueBookFile,
      vehicle_image: vehicleImageFile,
      identity_number: identityNumber,
      model: model,
    };

    if (vehicleType === "personal") {
      VehicleApiService.createVehicle(personalVehicleDataToSubmit)
        .then((res) => {
          if (res.data.success) {
            toastMsg(res.data.message, true);
            window.location.href = "/vehicle-list";
          }
        })
        .catch((error) => {
          toastMsg("something went wrong try again", false);
        });
    } else {
      VehicleApiService.createVehicle(organizationalVehicleDataToSubmit)
        .then((res) => {
          if (res.data.success) {
            toastMsg(res.data.message, true);
            window.location.href = "/vehicle-list";
          }
        })
        .catch((error) => {
          toastMsg("Failed during creation of vehicle.", false);
        });
    }
  };
  return (
    <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
      <form action='post' autocomplete='off' className='mt-3'>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              required
              type='text'
              className='form-control'
              id='vehicleNumber'
              placeholder='Vehicle number'
              value={vehicleNumber}
              onChange={(e) => {
                setVehicleNumber(e.target.value);
              }}
            />
            <label htmlFor='address'>Vehicle number</label>
          </div>
        </div>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              required
              type='text'
              className='form-control'
              id='identityNumber'
              placeholder='Identity number'
              value={identityNumber}
              onChange={(e) => {
                setIdentityNumber(e.target.value);
              }}
            />
            <label htmlFor='address'>Identity number</label>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              required
              type='text'
              className='form-control'
              id='identityNumber'
              placeholder='Identity number'
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
            <label htmlFor='address'>Model</label>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 '>
            <div className='w-100 mx-0 mt-3 mb-0'>
              <label className='text-secondary' htmlFor='meeting person'>
                Vehicle Type :
              </label>
              <div className='d-flex mt-3 ps-3'>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault1'
                    defaultChecked
                    onClick={(e) => {
                      setVehicleType("personal");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault1'>
                    Personal
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault2'
                    onClick={(e) => {
                      setVehicleType("organizational");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault2'>
                    Organization
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(() => {
          if (vehicleType === "personal") {
            return (
              <div className='col-12 col-sm w-100 form-floating'>
                <div className='row mt-5'>
                  <Select optionList={initialOptionsToSelectUser} placeholder='Select Users' selectedOption={selectedUser} dispatch={dispatch} useReducerDispatchType='SET_SELECTED_USER' />
                </div>
              </div>
            );
          } else {
            return (
              <div className='col-12 col-sm w-100 form-floating'>
                <div className='row mt-5'>
                  <Select optionList={initialOptionsToSelectOrganization} placeholder='Select Organization' selectedOption={selectedOrganization} dispatch={dispatchOrganization} useReducerDispatchType='SET_SELECTED_ORGANIZATION' />
                </div>
              </div>
            );
          }
        })()}

        <div className='row mt-5'>
          <div className='col-6 col-sm w-100 form-floating'>
            <div className='row mx-0 mt-1 mb-0 w-100'>
              <div className='col-12'>
                <label htmlFor='formFile' className='form-label'>
                  Vehicle Image
                </label>
                <input
                  className='form-control'
                  type='file'
                  id='formFile'
                  onChange={(e) => {
                    setVehicleImageFile(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-6 col-sm w-100 form-floating'>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label'>
                Bluebook Image
              </label>
              <input
                className='form-control'
                type='file'
                id='formFile'
                onChange={(e) => {
                  setBlueBookFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12'>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className='py-2 btn btstrp-shadow-effect w-100 mt-4 blue-bg text-white rounded-65'
            >
              <i className='bx bx-plus me-2'></i>
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Create;
