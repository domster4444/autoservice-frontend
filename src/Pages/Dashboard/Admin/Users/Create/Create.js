import React, { useState, useReducer } from "react";
import MultiSelect from "components/MultiSelect";
import { UserApiService } from "services/user/UserService";
import toastMsg from "library/utilities/toastMsg";

const Update = () => {
  let initialSelectedUserRole = [];
  const [userType, setUserType] = useState("personal");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_USER_ROLE":
        return action.payload;

      default:
        return state;
    }
  };
  const [selectedUserRole, dispatchUserRole] = useReducer(reducer, initialSelectedUserRole);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: userName,
      phone_number: phoneNumber,
      password: password,
      is_verified: verifiedStatus,
      email: email,
      type: userType,
      roles: `["${selectedUserRole.map((role) => role.value).join('","')}"]`,
      avatar: avatarImageFile,
    };
    if (!data.name || !data.phone_number || !data.roles.length) {
      return toastMsg("Please fill all the fields", false);
    }
    if (data.avatar === null) {
      return toastMsg("Please select an image", false);
    }
    UserApiService.createUser(data)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toastMsg(res.data.message, true);
          console.log(data);

          // convert   "[\"user\"]" to ["user"]  and then switch case

          let lastUserRole = data.roles.replace(/"/g, "").replace("[", "").replace("]", "");

          switch (lastUserRole) {
            case "user":
              window.location.href = "/users-client";
              break;
            case "admin":
              window.location.href = "/users-admin";
              break;
            case "mechanic":
              window.location.href = "/users-mechanics";
              break;
            default:
              window.location.href = "/users-receptionist";
              break;
          }
        } else {
          toastMsg("Error while creating user", false);
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.response.data.error) {
          toastMsg(error.response.data.error[0].msg, false);
        } else {
          toastMsg(error.response.data.message, false);
        }
      });
  };

  return (
    <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
      <form autocomplete='off' className='mt-3'>
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
              type='email'
              className='form-control'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>
        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              required
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor='phoneNumber'>Password</label>
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
                    defaultChecked
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
                    defaultChecked
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

        <div className='row mt-5'>
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
