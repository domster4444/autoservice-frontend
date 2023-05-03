import React, { useState, useEffect, useReducer } from "react";
import MultiSelect from "components/MultiSelect";
import { useGetSingleUserQuery } from "redux/api/users/userApi";
import { useParams } from "react-router-dom";
import { globalConstant } from "constant/constant";
import { UserApiService } from "services/user/UserService";

import toastMsg from "library/utilities/toastMsg";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

const View = () => {
  const { id } = useParams();

  const { data: fetchedUser, isLoading: isFetchedUserLoading, isError: isFetchedUserError } = useGetSingleUserQuery(id);

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("personal");
  const [verifiedStatus, setVerifiedStatus] = useState("false");
  const [avatarImageFile, setAvatarImageFile] = useState("");

  // ---------------- use reducer starts here
  let initialSelectedUserRole = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_USER_ROLE":
        return action.payload;

      default:
        return state;
    }
  };
  const [selectedUserRole, dispatchUserRole] = useReducer(reducer, initialSelectedUserRole);

  // ---------------- use reducer ends here

  useEffect(() => {
    // if user is fetched then update states
    console.log(fetchedUser);

    if (fetchedUser) {
      console.log(fetchedUser);
      setUserName(fetchedUser.data.name);
      setPhoneNumber(fetchedUser.data.phone_number);
      setVerifiedStatus(fetchedUser.data.is_verified);
      setUserType(fetchedUser.data.type);
      const userRole = [];
      for (let i = 0; i < fetchedUser.data.roles.length; i++) {
        userRole.push({ value: fetchedUser.data.roles[i], label: fetchedUser.data.roles[i] });
      }
      dispatchUserRole({ type: "SET_SELECTED_USER_ROLE", payload: userRole });
    }
  }, [fetchedUser]);

  if (isFetchedUserLoading) return <Loader />;
  if (isFetchedUserError) {
    return <ErrorCard />;
  }

  return (
    <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
      <form autocomplete='off' className='mt-3'>
        <div
          className='shadow-sm ms-3 mb-4'
          style={{
            height: "110px",
            width: "110px",
            backgroundImage: `url(${globalConstant.serverUrl}/storage/profile_pics/${fetchedUser?.data?.avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "50%",
          }}
        ></div>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              readOnly
              type='text'
              className='form-control'
              id='phoneNumber'
              placeholder='Phone number'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <label htmlFor='phoneNumber'>Phone number</label>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              readOnly
              type='text'
              className='form-control'
              id='userName'
              placeholder='Name'
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor='userName'>User name</label>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 '>
            <div className='w-100 mx-0 mt-3 mb-0'>
              <label className='text-secondary' htmlFor='meeting person'>
                Verification Status :
              </label>
              <div className='d-flex mt-3 ps-3'>
                <div className='form-check ps-0 pe-3'>
                  <input
                    disabled
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault1'
                    checked={verifiedStatus === true ? true : false}
                    onClick={(e) => {
                      setVerifiedStatus(true);
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault1'>
                    Verified
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    disabled
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault2'
                    checked={verifiedStatus === false ? true : false}
                    onClick={(e) => {
                      setVerifiedStatus(false);
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault2'>
                    Unverified
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 '>
            <div className='w-100 mx-0 mt-3 mb-0'>
              <label className='text-secondary' htmlFor='meeting person'>
                Type :
              </label>
              <div className='d-flex mt-3 ps-3'>
                <div className='form-check ps-0 pe-3'>
                  <input
                    disabled
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_third'
                    id='flexRadioDefault3'
                    checked={userType === "personal" ? true : false}
                    onClick={(e) => {
                      setUserType("personal");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault3'>
                    Personal
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    disabled
                    checked={userType === "organizational" ? true : false}
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_third'
                    id='flexRadioDefault4'
                    onClick={(e) => {
                      setUserType("organizational");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault4'>
                    Organizational
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 '>
            <MultiSelect placeholder='User Role' selectedOption={selectedUserRole} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default View;
