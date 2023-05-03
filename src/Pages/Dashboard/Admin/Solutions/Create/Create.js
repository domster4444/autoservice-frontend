import React, { useState } from "react";
import Select from "components/Select";
import toastMsg from "library/utilities/toastMsg";
import { useReducer } from "react";

import { useGetCategoryQuery } from "redux/api/category/categoryApi";
import { useGetUserQuery } from "redux/api/users/userApi";
import { useGetOrganizationQuery } from "redux/api/organization/organizationApi";
import { useCreateSolutionMutation } from "redux/api/solution/solutionApi";

import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const Create = () => {
  const { id } = useParams();

  const [createSolution, { isLoading: createSolutionLoading, isError: createSolutionError }] = useCreateSolutionMutation();

  const [solutionDetails, setSolutionDetails] = useState("");
  const [state, setState] = useState("verifying");
  const [price, setPrice] = useState("");

  /* //* ----------------------------------------- Select Signifinicant codes lies here STARTS */
  const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useGetCategoryQuery();

  let initialSelectedCategory = [];
  let initialOptionsToSelectCategory;
  if (categoryData) {
    initialOptionsToSelectCategory = categoryData.data.map((category) => {
      return { value: category._id, label: category.name };
    });
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SELECTED_CATEGORY":
        return action.payload;

      default:
        return state;
    }
  };

  const [selectedCategory, dispatch] = useReducer(reducer, initialSelectedCategory);

  if (categoryLoading) return <Loader />;
  if (categoryError) return <ErrorCard />;

  /* //* --------------------------------------------------------- Select Signifinicant codes lies here ENDS */

  // //! HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      id: id,
      body: {
        category: selectedCategory.value,
        price: price,
        state: state,
        detail: solutionDetails,
      },
    };

    // make sure all the fields are filled
    if (selectedCategory.value === undefined || price === "" || state === "" || solutionDetails === "") {
      toastMsg("Please fill all the fields", false);
      return;
    }

    createSolution(dataToSubmit)
      .then((res) => {
        if (res.error) {
          toastMsg(res.error.data.message, false);
        }
        if (res.data.success) {
          toastMsg(res.data.message, true);
          window.location.href = `/service-update/${id}`;
        }

        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
      <form action='post' autocomplete='off' className='mt-3'>
        <div className='col-12 col-sm w-100 form-floating'>
          <div className='row mt-5'>
            <Select optionList={initialOptionsToSelectCategory} placeholder='Select Category' selectedOption={selectedCategory} dispatch={dispatch} useReducerDispatchType='SET_SELECTED_CATEGORY' />
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <input
              required
              type='number'
              className='form-control'
              id='price'
              placeholder='Price'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <label htmlFor='address'>Price</label>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 '>
            <div className='w-100 mx-0 mt-3 mb-0'>
              <label className='text-secondary' htmlFor='meeting person'>
                Solution State :
              </label>
              <div className='d-flex mt-3 ps-3'>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault1'
                    onClick={(e) => {
                      setState("accepted");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault1'>
                    Accepted
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault2'
                    onClick={(e) => {
                      setState("completed");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault2'>
                    Completed
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault3'
                    onClick={(e) => {
                      setState("working");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault3'>
                    Working
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault4'
                    onClick={(e) => {
                      setState("rejected");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault4'>
                    Rejected
                  </label>
                </div>
                <div className='form-check ps-0 pe-3'>
                  <input
                    defaultChecked
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault_second'
                    id='flexRadioDefault5'
                    onClick={(e) => {
                      setState("verifying");
                    }}
                  />
                  <label className='form-check-label' htmlFor='flexRadioDefault5'>
                    Verifying
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mx-0 mt-1 mb-0 w-100'>
          <div className='col-12 col-sm w-100 form-floating'>
            <FloatingLabel controlId='floatingTextarea2' label='Solution Details'>
              <Form.Control
                as='textarea'
                placeholder='Leave solution details here'
                style={{ height: "100px" }}
                value={solutionDetails}
                onChange={(e) => {
                  setSolutionDetails(e.target.value);
                }}
              />
            </FloatingLabel>
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
              Create Solution
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Create;
