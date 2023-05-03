import React, { useState, useEffect, useReducer } from "react";
import { MdDeleteForever } from "react-icons/md";
import toastMsg from "library/utilities/toastMsg";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "redux/api/users/userApi";
import { useGetVehicleQuery } from "redux/api/vehicle/vehicleApi";
import { useUpdateServiceRequestMutation, useGetSingleServiceRequestQuery, usePostServiceRequestMutation } from "redux/api/serviceRequest/serviceRequestApi";
import SelectInput from "components/Select/Select";
import FormErrorTag from "components/FormErrorTag";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useChangeSolutionStateMutation, useDeleteSolutionMutation } from "redux/api/solution/solutionApi";
import { useGetAllEmployeeQuery } from "redux/api/employee/employeeApi";

import Table from "components/Table";

const Update = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [deleteSolution, { isLoading: isDeleteSolnLoading, isError: isDeleteSolnError }] = useDeleteSolutionMutation();

  const [changeSolnState, { isLoading: isChangeSolnStateLoading, isError: isChangeSolnStateError, isSuccess: isChangeSolnStateSuccess }] = useChangeSolutionStateMutation();

  const { data: fetchedServiceRequest, isLoading: isServiceReqLoading, isError: isServiceReqError } = useGetSingleServiceRequestQuery(id);

  const [updateServiceRequest, { isLoading: isUpdateServiceReqLoading, isError: isUpdateServiceReqError, isSuccess: isUpdateServiceReqSuccess }] = useUpdateServiceRequestMutation();

  const { data: fetchedUsers, isLoading: isUserLoading, isError: isUserError } = useGetUserQuery();
  const { data: fetchedVehicles, isLoading: isVehicleLoading, isError: isVehicleError } = useGetVehicleQuery();
  const { data: fetchedEmployee, isLoading: isEmployeeLoading, isError: isEmployeeError } = useGetAllEmployeeQuery();

  let userOptions = [];
  let vehicleOptions = [];
  let employeeOptions = [];

  if (fetchedUsers) {
    userOptions = fetchedUsers.data?.map((user) => {
      return { value: user._id, label: user.phone_number };
    });
  }

  if (fetchedVehicles) {
    vehicleOptions = fetchedVehicles.data?.map((vehicle) => {
      return { value: vehicle._id, label: vehicle.number };
    });
  }

  if (fetchedEmployee) {
    employeeOptions = fetchedEmployee.data?.map((employee) => {
      return { value: employee._id, label: employee.name };
    });
  }

  const [formErrorMsg, setFormErrorMsg] = useState({
    status: false,
    message: "",
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_VEHICLE":
        return {
          ...state,
          selectedVehicle: action.payload,
        };
      case "SET_SELECTED_USER":
        return {
          ...state,
          selectedUser: action.payload,
        };

      case "SET_SELECTED_EMPLOYEE":
        return {
          ...state,
          selectedEmployee: action.payload,
        };

      case "SET_ISSUE_DESCRIPTION":
        return {
          ...state,
          issueDescription: action.payload,
        };
      case "SET_IS_PICKEDUP":
        return {
          ...state,
          is_pickup: action.payload,
        };

      case "SET_IS_DROPPEDUP":
        return {
          ...state,
          is_drop: action.payload,
        };

      case "SET_PICKUP_STREET":
        return {
          ...state,
          pickup_street: action.payload,
        };
      case "SET_PICKUP_WARD":
        return {
          ...state,
          pickup_ward: action.payload,
        };
      case "SET_PICKUP_LOCALITY":
        return {
          ...state,
          pickup_locality: action.payload,
        };

      case "SET_DROPUP_STREET":
        return {
          ...state,
          dropup_street: action.payload,
        };
      case "SET_DROPUP_WARD":
        return {
          ...state,
          dropup_ward: action.payload,
        };
      case "SET_DROPUP_LOCALITY":
        return {
          ...state,
          dropup_locality: action.payload,
        };

      default:
        return state;
    }
  };

  const initialState = {
    selectedVehicle: "",
    selectedUser: "",
    selectedEmployee: "",
    issueDescription: "",
    is_pickup: false,
    is_drop: false,
    pickup_street: "",
    pickup_ward: "",
    pickup_locality: "",
    dropup_street: "",
    dropup_ward: "",
    dropup_locality: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedVehicle, selectedUser, selectedEmployee, issueDescription, is_pickup, is_drop, pickup_street, pickup_ward, pickup_locality, dropup_street, dropup_ward, dropup_locality } = state;

  const [issues, setIssues] = useState([]);

  const handleAddIssue = (e) => {
    e.preventDefault();
    setIssues([...issues, { issueDescription }]);
    dispatch({ type: "SET_ISSUE_DESCRIPTION", payload: "" });
  };

  const handleDeleteLastIssue = (e) => {
    if (issues.length === 0) {
      toastMsg("No issue to delete.", false);
      return 0;
    }

    e.preventDefault();
    issues.splice(-1, 1);
    setIssues([...issues]);
  };
  const handleDeleteSpecificIssue = (issueIndex) => {
    issues.splice(issueIndex, 1);
    setIssues([...issues]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      vehicle_id: state.selectedVehicle.value,
      user: state.selectedUser.value,
      employee: state.selectedEmployee.value,
      issue: issues.map((issue) => issue.issueDescription),
      number: state.selectedVehicle.value,
      is_pickup: state.is_pickup,
      is_dropoff: state.is_drop,
      pickup_detail: {
        street: state.pickup_street,
        ward: state.pickup_ward,
        locality: state.pickup_locality,
      },
      dropoff_detail: {
        street: state.dropup_street,
        ward: state.dropup_ward,
        locality: state.dropup_locality,
      },
    };

    const errorMessages = {
      vehicle: "Please select vehicle.",
      user: "Please select user.",
      employee: "Please select employee.",
      pickup_street: "Please enter pickup street.",
      pickup_ward: "Please enter pickup ward.",
      pickup_locality: "Please enter pickup locality.",
      dropup_street: "Please enter drop street.",
      dropup_ward: "Please enter drop ward.",
      dropup_locality: "Please enter drop locality.",
      issue: "Please add at least one issue.",
    };

    const selectedInputs = {
      vehicle: selectedVehicle,
      number: selectedVehicle,
      user: selectedUser,
      employee: selectedEmployee,
      issue: issues.length,
      pickup_street: pickup_street,
      pickup_ward: pickup_ward,
      pickup_locality: pickup_locality,
      dropup_street: dropup_street,
      dropup_ward: dropup_ward,
      dropup_locality: dropup_locality,
    };

    const errorMessage = Object.keys(selectedInputs).find((key) => !selectedInputs[key]);

    if (errorMessage) {
      setFormErrorMsg({
        status: true,
        message: errorMessages[errorMessage],
      });
      return;
    }

    setFormErrorMsg({
      status: false,
      message: "",
    });

    await updateServiceRequest({
      id: id,
      body: dataToSubmit,
    }).then((res) => {
      console.log("Response from Service request update =", res);

      // toastMsg("Service request updated successfully.", true);
      // window.href.location = "/service-list";
    });
  };

  useEffect(() => {
    if (fetchedServiceRequest) {
      const serviceRequestData = fetchedServiceRequest.data;
      if (fetchedEmployee) {
        const selectedEmployeeId = fetchedServiceRequest.data.employee;
        const selectedEmployee = fetchedEmployee.data.find((employee) => employee._id === selectedEmployeeId);
        console.log("selectedEmployee =", selectedEmployee);

        dispatch({ type: "SET_SELECTED_EMPLOYEE", payload: { value: selectedEmployee._id, label: selectedEmployee.name } });
      }

      dispatch({ type: "SET_SELECTED_VEHICLE", payload: { value: serviceRequestData.vehicle._id, label: serviceRequestData.vehicle.number } });
      dispatch({ type: "SET_SELECTED_USER", payload: { value: serviceRequestData.user._id, label: serviceRequestData.user.phone_number } });
      setIssues(serviceRequestData.issue.map((issue) => ({ issueDescription: issue })));
      dispatch({ type: "SET_IS_PICKEDUP", payload: serviceRequestData.is_pickup });
      dispatch({ type: "SET_IS_DROPPEDUP", payload: serviceRequestData.is_dropoff });
      dispatch({ type: "SET_PICKUP_STREET", payload: serviceRequestData.pickup_detail.street });
      dispatch({ type: "SET_PICKUP_WARD", payload: serviceRequestData.pickup_detail.ward });
      dispatch({ type: "SET_PICKUP_LOCALITY", payload: serviceRequestData.pickup_detail.locality });
      dispatch({ type: "SET_DROPUP_STREET", payload: serviceRequestData.dropoff_detail.street });
      dispatch({ type: "SET_DROPUP_WARD", payload: serviceRequestData.dropoff_detail.ward });
      dispatch({ type: "SET_DROPUP_LOCALITY", payload: serviceRequestData.dropoff_detail.locality });
    }
  }, [fetchedServiceRequest]);

  const columns = [
    {
      name: "Detail",
      selector: "detail",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },

    {
      name: "State",
      cell: (row) => {
        return (
          <Form.Select
            onChange={(e) => {
              console.log("e.target.value =", e.target.value);
              console.log("solution id=", row._id);

              changeSolnState({
                id: row._id,
                body: {
                  state: e.target.value,
                },
              }).then((res) => {
                console.log("Response from solution state update =", res);

                if (res.data) {
                  toastMsg(res.data.message, true);
                } else {
                  toastMsg("Unable to update solution", true);
                }
              });
            }}
            aria-label='Default select state'
          >
            <option>Choose State</option>
            <option selected={row.state === "accepted" ? "selected" : null} value='accepted'>
              accepted
            </option>
            <option selected={row.state === "completed" ? "selected" : null} value='completed'>
              completed
            </option>
            <option selected={row.state === "working" ? "selected" : null} value='working'>
              working
            </option>
            <option selected={row.state === "rejected" ? "selected" : null} value='rejected'>
              rejected
            </option>
            <option selected={row.state === "verifying" ? "selected" : null} value='verifying'>
              verifying
            </option>
          </Form.Select>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='d-flex justify-content-center   w-100 flex-wrap'>
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/solution-update/${row._id}/${id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <a
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={() => {
              deleteSolution(row._id)
                .then((res) => {
                  console.log(res);
                  if (res.data.success) {
                    window.location.reload();
                  } else {
                    toastMsg("Unable to delete solution", false);
                  }
                })
                .catch((error) => {
                  toastMsg("unable to delete solution", false);
                });
            }}
          >
            <i className='bx bxs-trash me-2'></i>
            Delete
          </a>
        </div>
      ),
    },
  ];

  if (isUpdateServiceReqLoading || isVehicleLoading || isUserLoading || isServiceReqLoading) {
    return <Loader />;
  }
  if (isUpdateServiceReqError || isServiceReqError || isChangeSolnStateError) {
    toastMsg("Service creation failed.", false);
  }
  if (isVehicleError) {
    return <ErrorCard />;
  }
  if (isUserError) {
    return <ErrorCard />;
  }

  if (isUpdateServiceReqSuccess) {
    toastMsg("Service created successfully.", true);
    window.location.href = "/service-list";
  }

  return (
    <>
      <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
        <form>
          <div className='row mx-0 mt-3 mb-0 '>
            <SelectInput placeholder='Select vehicle ...' optionList={vehicleOptions} selectedOption={selectedVehicle} dispatch={dispatch} useReducerDispatchType={"SET_SELECTED_VEHICLE"} />
            <SelectInput placeholder='Select users ...' optionList={userOptions} selectedOption={selectedUser} dispatch={dispatch} useReducerDispatchType={"SET_SELECTED_USER"} />
            <SelectInput placeholder='Select employee ...' optionList={employeeOptions} selectedOption={selectedEmployee} dispatch={dispatch} useReducerDispatchType={"SET_SELECTED_EMPLOYEE"} />
          </div>

          <div className='row mx-0 mt-1 mb-0 w-100'>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='pickup_street' placeholder='Pickup street' value={pickup_street} onChange={(e) => dispatch({ type: "SET_PICKUP_STREET", payload: e.target.value })} />
              <label htmlFor='address'>Pickup street</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='pickup_ward' placeholder='Pickup ward' value={pickup_ward} onChange={(e) => dispatch({ type: "SET_PICKUP_WARD", payload: e.target.value })} />
              <label htmlFor='address'>Pickup ward</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='pickup_locality' placeholder='Pickup locality' value={pickup_locality} onChange={(e) => dispatch({ type: "SET_PICKUP_LOCALITY", payload: e.target.value })} />
              <label htmlFor='address'>Pickup locality</label>
            </div>
          </div>

          <div className='row mx-0 mt-1 mb-0 w-100'>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='pickup_street' placeholder='Pickup street' value={dropup_street} onChange={(e) => dispatch({ type: "SET_DROPUP_STREET", payload: e.target.value })} />
              <label htmlFor='address'>Dropup street</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='dropup_ward' placeholder='Dropup ward' value={dropup_ward} onChange={(e) => dispatch({ type: "SET_DROPUP_WARD", payload: e.target.value })} />
              <label htmlFor='address'>Dropup ward</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <input type='text' className='form-control' id='dropup_locality' placeholder='Dropup locality' value={dropup_locality} onChange={(e) => dispatch({ type: "SET_DROPUP_LOCALITY", payload: e.target.value })} />
              <label htmlFor='address'>Dropup locality</label>
            </div>
          </div>

          <div className='row mx-0 mt-1 mb-0 w-100'>
            <div className='col-12 '>
              <div className='w-100 mx-0 mt-3 mb-0'>
                <label className='text-secondary' htmlFor='meeting person'>
                  Pickup Details :
                </label>
                <div className='d-flex mt-3 ps-3'>
                  <div className='form-check ps-0 pe-3'>
                    <input
                      defaultChecked={fetchedServiceRequest.data.is_pickup === true ? true : false}
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault_second'
                      id='isPickedup'
                      onClick={(e) => {
                        dispatch({ type: "SET_IS_PICKEDUP", payload: true });
                      }}
                    />
                    <label className='form-check-label' htmlFor='isPickedup'>
                      Pickedup
                    </label>
                  </div>
                  <div className='form-check ps-0 pe-3'>
                    <input
                      defaultChecked={fetchedServiceRequest.data.is_pickup === false ? true : false}
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault_second'
                      id='isNotPickedUp'
                      onClick={(e) => {
                        dispatch({ type: "SET_IS_PICKEDUP", payload: false });
                      }}
                    />
                    <label className='form-check-label' htmlFor='isNotPickedUp'>
                      Not Pickedup
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
                  Dropup Details :
                </label>
                <div className='d-flex mt-3 ps-3'>
                  <div className='form-check ps-0 pe-3'>
                    <input
                      defaultChecked={fetchedServiceRequest.data.is_dropoff === true ? true : false}
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault_third'
                      id='isDroppedUp'
                      onClick={(e) => {
                        dispatch({ type: "SET_IS_DROPPEDUP", payload: true });
                      }}
                    />
                    <label className='form-check-label' htmlFor='isDroppedUp'>
                      Droppedup
                    </label>
                  </div>
                  <div className='form-check ps-0 pe-3'>
                    <input
                      defaultChecked={fetchedServiceRequest.data.is_dropoff === false ? true : false}
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault_third'
                      id='isNotDroppedUp'
                      onClick={(e) => {
                        dispatch({ type: "SET_IS_DROPPEDUP", payload: false });
                      }}
                    />
                    <label className='form-check-label' htmlFor='isNotDroppedUp'>
                      Not Droppedup
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row  mx-0 mt-0 mb-0 w-100'>
            <textarea
              id='message'
              className='ms-3 mt-2 p-0 form-field w-100 bg-transparent py-3'
              placeholder='Issue description'
              rows='6'
              value={issueDescription}
              onChange={(e) => {
                dispatch({ type: "SET_ISSUE_DESCRIPTION", payload: e.target.value });
              }}
            ></textarea>

            <div className='d-flex'>
              <button
                type='button'
                onClick={(e) => {
                  handleAddIssue(e);
                }}
                className='py-1 btn btstrp-shadow-effect mt-4 blue-bg text-white rounded-65'
              >
                <i className='bx bx-plus mx-2'></i>
                Add Issue
              </button>
              <button
                type='button'
                onClick={(e) => {
                  handleDeleteLastIssue(e);
                }}
                className='py-1 mx-2 btn btstrp-shadow-effect mt-4 blue-bg text-white rounded-65'
              >
                <i className='bx bx-minus mx-2'></i>
                Delete Last Issue
              </button>
            </div>
          </div>

          <div className='d-flex flex-wrap mb-4'>
            {/* //? issues container  starts */}
            {issues.map((issue, index) => (
              <div className='my-5 mx-2 col-12 col-md-4 col-lg-3 mb-3' key={index}>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body d-flex flex-column justify-content-between'>
                    <div>
                      <h5 className='card-title'>{issue.issueTitle}</h5>
                      <p className='card-text'>{issue.issueDescription}</p>
                    </div>

                    <div className='mt-4 d-flex justify-content-end'>
                      <button
                        type='button'
                        className='btn blue-bg text-white d-flex align-items-center fs-5'
                        onClick={(e) => {
                          handleDeleteSpecificIssue(index);
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

          {formErrorMsg.status && (
            <FormErrorTag>
              <p className='ps-3'>{formErrorMsg.message}</p>
            </FormErrorTag>
          )}

          <div className='row mx-0  mt-1 mb-0 w-100'>
            <div className='col-12'>
              <button
                type='button'
                className='btn blue-bg text-white d-flex align-items-center fs-5 me-2'
                onClick={(e) => {
                  navigate(`/solution-create/${id}`);
                }}
              >
                Add solution
              </button>
            </div>
          </div>

          <div className='animate__animated animate__fadeInUp'>
            <Table columns={columns} data={fetchedServiceRequest.data.solutions} />
          </div>

          <div className='row mx-0  mt-1 mb-0 w-100'>
            <div className='col-12'>
              <button
                type='submit'
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className='py-2 btn btstrp-shadow-effect w-100 blue-bg text-white rounded-65 '
              >
                <i className='bx bx-plus me-2'></i>
                Update
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Update;
