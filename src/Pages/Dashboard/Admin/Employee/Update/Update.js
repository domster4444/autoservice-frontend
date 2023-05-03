import React, { useState, useReducer, useEffect } from "react";
import toastMsg from "library/utilities/toastMsg";
import FormErrorTag from "components/FormErrorTag";
import { useUpdateEmployeeMutation, useGetSingleEmployeeMutation } from "redux/api/employee/employeeApi";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  const [getSingleEmployee, { isLoading: getSingleEmployeeIsLoading, isError: getSingleEmployeeIsError }] = useGetSingleEmployeeMutation();

  const [updateEmployee, { isLoading: updateEmployeeIsLoading, isError: updateEmployeeIsError }] = useUpdateEmployeeMutation();

  const [formErrorMsg, setFormErrorMsg] = useState({
    status: false,
    message: "",
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_EMPLOYEE_NAME":
        return {
          ...state,
          employeeName: action.payload,
        };
      case "SET_EMPLOYEE_DESIGNATION":
        return {
          ...state,
          employeeDesignation: action.payload,
        };

      default:
        return state;
    }
  };

  const initialState = {
    employeeName: "",
    employeeDesignation: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { employeeName, employeeDesignation } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeName === "") {
      toastMsg("Please specify employee name.", false);
      return 0;
    }

    if (employeeDesignation === "") {
      toastMsg("Please specify employee designation.", false);
      return 0;
    }

    console.log("submitted", state);

    const dataToSubmit = {
      id: id,
      body: {
        name: state.employeeName,
        designation: state.employeeDesignation,
      },
    };

    updateEmployee(dataToSubmit)
      .then((res) => {
        console.log("update employee res", res);
        if (res.data.success) {
          toastMsg(res.data.message, true);
          window.location.href = "/employee-list";
        } else {
          toastMsg("unable to create employee", false);
        }
      })
      .catch((err) => {
        toastMsg(" Something went wrong.", false);
      });
  };

  useEffect(() => {
    getSingleEmployee(id)
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_EMPLOYEE_NAME", payload: res.data.data.name });
        dispatch({ type: "SET_EMPLOYEE_DESIGNATION", payload: res.data.data.designation });
      })
      .catch((err) => {
        toastMsg(" Something went wrong.", false);
      });
  }, []);

  return (
    <>
      <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
        <form action='post'>
          <div className='row flex-column  mx-0 mt-0 mb-0 w-100'>
            <div className='col-12 col-sm w-100 form-floating'>
              <input
                required
                type='text'
                className='form-control'
                id='employee'
                placeholder='Employee name'
                value={employeeName}
                onChange={(e) => {
                  dispatch({ type: "SET_EMPLOYEE_NAME", payload: e.target.value });
                }}
              />
              <label htmlFor='employee'>Employee name</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <input
                required
                type='text'
                className='form-control'
                id='designation'
                placeholder='Employee designation'
                value={employeeDesignation}
                onChange={(e) => {
                  dispatch({ type: "SET_EMPLOYEE_DESIGNATION", payload: e.target.value });
                }}
              />
              <label htmlFor='designation'>Employee designation</label>
            </div>
          </div>

          {formErrorMsg.status && (
            <FormErrorTag>
              <p className='ps-3'>{formErrorMsg.message}</p>
            </FormErrorTag>
          )}

          <div className='row mx-0  mt-1 mb-0 w-100'>
            <div className='col-12 mt-3'>
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
