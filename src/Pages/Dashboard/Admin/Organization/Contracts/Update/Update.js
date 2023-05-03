import React, { useEffect, useState } from "react";

import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

import { useGetSingleContractMutation, useUpdateSingleContractMutation } from "redux/api/contract/contractApi";
import { useParams } from "react-router-dom";
import toastMsg from "library/utilities/toastMsg";

const Update = () => {
  const { id, orgId } = useParams();

  const [getContract, { isError: isGetSingleContractError, isLoading: isGetSingleContractLoading }] = useGetSingleContractMutation();

  const [updateContract, { isError: isUpdateSingleContractError, isLoading: isUpdateSingleContractLoading }] = useUpdateSingleContractMutation();

  const [contractStartDate, setContractStateDate] = useState();
  const [contractEndDate, setContractEndDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContract({
      id: id,
      orgId: orgId,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
    }).then((res) => {
      if (res.data.success) {
        toastMsg(res.data.message, "success");
        window.location.href = `/organization-list`;
      }
    });
  };

  // function to convert yyyy-mm-ddT00:00:00.000Z to which input type date can accept
  const convertDateForInputField = (date) => {
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  };

  useEffect(() => {
    getContract({
      id: id,
      orgId: orgId,
    }).then((res) => {
      setContractStateDate(convertDateForInputField(res.data.data.start_date));
      setContractEndDate(convertDateForInputField(res.data.data.end_date));
    });
  }, []);

  if (isGetSingleContractLoading) {
    return <Loader />;
  }

  if (isGetSingleContractError) {
    return <ErrorCard />;
  }
  return (
    <div>
      <section id='visitor-form' class='px-4 pb-5 rounded-4 bg-white position-relative shadow-sm rounded-65 animate__animated animate__fadeInUp'>
        <form autocomplete='off' className='mt-3'>
          <div class='col-12 col-sm w-100 form-floating'>
            <input
              type='date'
              class='form-control'
              id='start-date'
              placeholder='Contract start date'
              value={contractStartDate}
              onChange={(e) => {
                setContractStateDate(e.target.value);
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
                setContractEndDate(e.target.value);
              }}
            />
            <label for='start-date'>Contract end date</label>
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
                Update contract
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Update;
