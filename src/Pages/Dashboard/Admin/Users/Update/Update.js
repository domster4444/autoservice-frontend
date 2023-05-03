import React, { useState, useEffect, useReducer } from "react";
import MultiSelect from "components/MultiSelect";
import { useGetSingleUserQuery } from "redux/api/users/userApi";
import { useParams } from "react-router-dom";
import { globalConstant } from "constant/constant";
import { UserApiService } from "services/user/UserService";

import toastMsg from "library/utilities/toastMsg";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

const Update = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();

    const formDataWithAvatar = {
      name: userName,
      phone_number: phoneNumber,
      is_verified: verifiedStatus.toString(),
      type: userType,
      roles: `["${selectedUserRole.map((role) => role.value).join('","')}"]`,
      // ! NOT ALLOW TO UPDATE AVATAR, as if user sends no files then nextime we can't delete user with no picture as in validation there is logic of searching for user picture in file system
      // ! in such case we can't delete user as there is no picture in file system
      // ! also in, get user by id api we are not sending user picture file object to client ,but user pic name instead
      //! due to which by default we can show user picture but not set setAvatar to file object as we are not getting it from server
      avatar: avatarImageFile,
    };
    const formDataWithoutAvatar = {
      name: userName,
      phone_number: phoneNumber,
      is_verified: verifiedStatus.toString(),
      type: userType,
      roles: `["${selectedUserRole.map((role) => role.value).join('","')}"]`,
    };

    const dataToUpdate = {
      id: id,
      body: avatarImageFile ? formDataWithAvatar : formDataWithoutAvatar,
    };

    console.log(dataToUpdate);

    UserApiService.updateUser(dataToUpdate)
      .then((res) => {
        if (res.data.success) {
          toastMsg(res.data.message, true);
          // get last item of array selectedUserRole.map((role) => role.value
          // if it is user then redirect to user list page
          // if it is admin then redirect to admin list page using switch case

          const lastItem = selectedUserRole.map((role) => role.value)[selectedUserRole.length - 1];
          switch (lastItem) {
            case "user":
              window.location.href = "/users-client";
              break;
            case "mechanic":
              window.location.href = "/users-mechanics";
              break;
            case "admin":
              window.location.href = "/users-admin";
              break;
            case "receptionist":
              window.location.href = "/users-receptionist";
              break;
            default:
              break;
          }
        } else {
          toastMsg("Unable to update user", false);
        }
      })
      .catch((err) => {
        console.log(err);
        toastMsg("Something went wrong while updating user.", false);
      });
  };

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
              required
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
              required
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
            <MultiSelect
              placeholder='User Role'
              optionList={[
                { value: "admin", label: "admin" },
                { value: "user", label: "user" },
                { value: "mechanic", label: "mechanic" },
                { value: "receptionist", label: "receptionist" },
              ]}
              selectedOption={selectedUserRole}
              dispatch={dispatchUserRole}
              useReducerDispatchType='SET_SELECTED_USER_ROLE'
            />
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col-6 col-sm w-100 form-floating'>
            <div className='row mx-0 mt-1 mb-0 w-100'>
              <div className='col-12'>
                <label htmlFor='formFile' className='form-label'>
                  Avatar Image
                </label>
                <input
                  className='form-control'
                  type='file'
                  id='formFile'
                  onChange={(e) => {
                    setAvatarImageFile(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12'>
            <button
              onClick={(e) => {
                submitHandler(e);
              }}
              className='py-2 btn btstrp-shadow-effect w-100 mt-4 blue-bg text-white rounded-65'
            >
              <i className='bx bx-plus me-2'></i>
              Update User
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Update;
