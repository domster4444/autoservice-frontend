import React, { useState, useReducer } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useGetUserQuery } from "redux/api/users/userApi";
import { useCreateOrganizationMutation } from "redux/api/organization/organizationApi";

import MultiSelect from "components/MultiSelect";
import toastMsg from "library/utilities/toastMsg";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

const convertDate = (date) => {
  const dateArray = date.split("-");
  const year = parseInt(dateArray[0]) + 1;
  const month = dateArray[1];
  const day = dateArray[2];
  return `${year}-${month}-${day}`;
};

const Create = () => {
  const { data: fetchedUsers, isLoading: isUserLoading, isError: isUserError } = useGetUserQuery();

  const [createOrganization, { isLoading: isCreateOrgLoading, isError: isCreateOrgError }] = useCreateOrganizationMutation();
  let userOptions = [];
  if (fetchedUsers) {
    userOptions = fetchedUsers.data?.map((user) => {
      return { value: user._id, label: user.phone_number };
    });
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_ORGANIZATION_NAME":
        return {
          ...state,
          organizationName: action.payload,
        };
      case "SET_CONTRACT_START_DATE":
        return {
          ...state,
          contractStartDate: action.payload,
        };
      case "SET_CONTRACT_END_DATE":
        return {
          ...state,
          contractEndDate: action.payload,
        };
      case "SET_SELECTED_USER":
        return {
          ...state,
          selectedUser: action.payload,
        };
      default:
        return state;
    }
  };

  const initialState = {
    organizationName: "",
    contractStartDate: "",
    contractEndDate: "",
    selectedUser: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { organizationName, selectedUser, contractStartDate, contractEndDate } = state;

  const [organizationContracts, setOrganizationContracts] = useState([]);

  const handleAddOrganizationContract = (e) => {
    e.preventDefault();
    if (contractStartDate === "" || contractEndDate == "") {
      toastMsg("Please specify both contract start date and end date.", false);
      return 0;
    }
    setOrganizationContracts([...organizationContracts, { contractStartDate, contractEndDate }]);
    dispatch({ type: "SET_CONTRACT_START_DATE", payload: "" });
    dispatch({ type: "SET_CONTRACT_END_DATE", payload: "" });
  };

  const handleDeleteLastOrganizationContract = (e) => {
    if (organizationContracts.length === 0) {
      toastMsg("No contract to delete.", false);
      return 0;
    }
    e.preventDefault();
    organizationContracts.splice(-1, 1);
    setOrganizationContracts([...organizationContracts]);
  };
  const handleDeleteSpecificOrganizationContract = (organizationContractIndex) => {
    // delete issue of given index
    organizationContracts.splice(organizationContractIndex, 1);
    setOrganizationContracts([...organizationContracts]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (organizationName === "") {
      toastMsg("Please specify organization name.", false);
      console.log("organizationName", organizationName);
      return 0;
    }
    if (organizationContracts.length === 0) {
      toastMsg("Please specify at least one contract.", false);
      return 0;
    }
    console.log("organizationContracts", organizationContracts);
    const organizationData = {
      name: organizationName,
      contracts: organizationContracts.map((contract) => {
        return {
          start_date: convertDate(contract.contractStartDate),
          end_date: convertDate(contract.contractEndDate),
        };
      }),

      user: selectedUser.map((user) => {
        return user.value;
      }),
    };
    console.log("organizationData", organizationData);
    createOrganization(organizationData).then((res) => {
      console.log("res 🌄", res);
      if (res.error) {
        toastMsg(res.error.data.message, false);
      } else if (res.data.success) {
        toastMsg(res.data.message, true);
        window.location.href = "/organization-list";
      }
    });
  };

  if (isCreateOrgLoading || isUserLoading) return <Loader />;
  if (isCreateOrgError || isUserError) return <ErrorCard />;

  return (
    <section id='visitor-form' class='px-4 pb-5 rounded-4 bg-white position-relative shadow-sm rounded-65 animate__animated animate__fadeInUp'>
      <form action='post' autocomplete='off' className='mt-3'>
        <div class='row mx-0 mt-3 mb-0 w-100'>
          <div class='col-12 col-sm w-100 form-floating'>
            <input
              type='text'
              class='form-control'
              id='fullname'
              placeholder='Your full name'
              value={organizationName}
              onChange={(e) => {
                dispatch({ type: "SET_ORGANIZATION_NAME", payload: e.target.value });
              }}
            />
            <label for='fullname'>Organization Name</label>
          </div>
        </div>
        <div class='row mx-0 mt-3 mb-0 w-100'>
          <div class='col-12 col-sm w-100 form-floating'>
            <MultiSelect placeholder='Select users ...' optionList={userOptions} selectedOption={selectedUser} dispatch={dispatch} useReducerDispatchType={"SET_SELECTED_USER"} />
          </div>
        </div>

        <div class='row  mx-0 mt-3 mb-0 w-100'>
          <div class='col-12 col-sm w-100 form-floating'>
            <input
              type='date'
              class='form-control'
              id='start-date'
              placeholder='Contract start date'
              value={contractStartDate}
              onChange={(e) => {
                dispatch({ type: "SET_CONTRACT_START_DATE", payload: e.target.value });
              }}
            />
            <label for='start-date'>Contract start date</label>
          </div>

          <div class='col-12 col-sm w-100 form-floating'>
            <input
              type='date'
              class='form-control'
              id='end-date'
              placeholder='Contract end date'
              value={contractEndDate}
              onChange={(e) => {
                dispatch({ type: "SET_CONTRACT_END_DATE", payload: e.target.value });
              }}
            />
            <label for='end-date'>Contract start date</label>
          </div>

          <div className='d-flex'>
            <button
              type='button'
              onClick={(e) => {
                handleAddOrganizationContract(e);
              }}
              className='py-1 btn btstrp-shadow-effect mt-4 blue-bg text-white rounded-65'
            >
              <i className='bx bx-plus mx-2'></i>
              Add contract
            </button>
            <button
              type='button'
              onClick={(e) => {
                handleDeleteLastOrganizationContract(e);
              }}
              className='py-1 mx-2 btn btstrp-shadow-effect mt-4 blue-bg text-white rounded-65'
            >
              <i className='bx bx-minus mx-2'></i>
              Delete Last contract
            </button>
          </div>
        </div>

        <div className='d-flex flex-wrap mb-4'>
          {/* //? contract container  starts */}
          {organizationContracts.map((contract, index) => (
            <div className='animate__animated animate__zoomIn my-5 mx-2 col-12 col-md-4 col-lg-3 mb-3' key={index}>
              <div className='card h-100 border-0 shadow-sm'>
                <div className='card-body d-flex flex-column justify-content-between'>
                  <div>
                    <h6 className='card-title'>Contract: {index + 1}</h6> <br />
                    <h6 className='card-title'>Start Date : {contract.contractStartDate} A.D</h6>
                    <h6 className='card-title'>End Date &nbsp; : {contract.contractEndDate} A.D</h6>
                  </div>
                  <div className='mt-4 d-flex justify-content-end'>
                    <button
                      type='button'
                      className='btn blue-bg text-white d-flex align-items-center fs-5'
                      onClick={(e) => {
                        handleDeleteSpecificOrganizationContract(index);
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* //? issues container  ends */}
        </div>

        <div class='row mx-0 mt-1 mb-0 w-100'>
          <div class='col-12'>
            <button
              class='py-2 btn btstrp-shadow-effect w-100 mt-4 blue-bg text-white rounded-65'
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              <i class='bx bx-plus'></i>
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Create;
