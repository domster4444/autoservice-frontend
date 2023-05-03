import React, { useState, useEffect } from "react";
import toastMsg from "library/utilities/toastMsg";
import { useUpdateSolutionMutation, useGetSingleSolutionMutation } from "redux/api/solution/solutionApi";

import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id, srid } = useParams();

  const [updateSolution, { isLoading: updateSolutionLoading, isError: updateSolutionError }] = useUpdateSolutionMutation();

  const [solutionDetails, setSolutionDetails] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState("");

  const [getSingleSolution, { isLoading: getSolutionLoading, isError: getSolutionError }] = useGetSingleSolutionMutation();

  /* //* ----------------------------------------- Select Signifinicant codes lies here STARTS */

  useEffect(() => {
    getSingleSolution(id).then((res) => {
      if (res.data) {
        const { detail, price, state } = res.data.data;

        setSolutionDetails(detail);
        setPrice(price);
        setState(state);
        console.log(state);
      } else {
        toastMsg("error while fetching solution data.", false);
      }

      console.log(res);
    });
  }, []);

  /* //* --------------------------------------------------------- Select Signifinicant codes lies here ENDS */

  // //! HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      id: id,
      body: {
        price: price,
        state: state,
        detail: solutionDetails,
      },
    };

    // make sure all the fields are filled
    if (price === "" || state === "" || solutionDetails === "") {
      toastMsg("Please fill all the fields", false);
      return;
    }

    console.log("dataToSubmit", dataToSubmit);

    updateSolution(dataToSubmit)
      .then((res) => {
        if (res.data.success) {
          toastMsg(res.data.message, true);
          window.location.href = "/service-update/" + srid;
        } else {
          toastMsg("unable to update employee", false);
        }
      })
      .catch((err) => {
        toastMsg(" Something went wrong.", false);
      });
  };

  if (updateSolutionLoading || getSolutionLoading) {
    return <Loader />;
  }

  if (updateSolutionError || getSolutionError) {
    return <ErrorCard />;
  }

  return (
    <section id='visitor-form' className='shadow-sm pb-4 animate__animated animate__fadeInUp'>
      <form action='post' autocomplete='off' className='mt-3'>
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
                    checked={state === "accepted" ? true : false}
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
                    checked={state === "completed" ? true : false}
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
                    checked={state === "working" ? true : false}
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
                    checked={state === "rejected" ? true : false}
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
                    checked={state === "verifying" ? true : false}
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
              Update Solution
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Update;
