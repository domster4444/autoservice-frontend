import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "redux/api/users/userApi";

import { useUpdateServiceRequestStatusMutation, useGetAllServiceRequestQuery, useDeleteServiceRequestMutation } from "redux/api/serviceRequest/serviceRequestApi";
import Form from "react-bootstrap/Form";

//* components
import Table from "components/Table";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";
import toastMsg from "library/utilities/toastMsg";

const List = () => {
  const { data: serviceRequestData, isLoading: serviceRequestLoading, isError: serviceRequestError } = useGetAllServiceRequestQuery();
  const [deleteServiceRequest, { isLoading: deleteServiceRequestLoading, isError: deleteServiceRequestError, isSuccess: isDeleteServiceRequestSuccess }] = useDeleteServiceRequestMutation();
  const [updateServiceReqStatus, { isError: updateServiceReqStatusError, isSuccess: isUpdateServiceReqStatusSuccess }] = useUpdateServiceRequestStatusMutation();

  const [name, setName] = useState("");
  const [roles, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  const loggedUser = useSelector((state) => state.loggedUser);
  const { data: loggedInUserDetails, isLoading, isError, error } = useGetSingleUserQuery(loggedUser.user._id);

  useEffect(() => {
    if (loggedInUserDetails) {
      setName(loggedInUserDetails.data.name);
      setRole(loggedInUserDetails.data.roles);
      setAvatar(loggedInUserDetails.data.avatar);
    }
  }, [loggedInUserDetails]);

  const columns = [
    {
      name: "Vehicle number",
      selector: "vehicle",
      cell: (row) => (
        <div>
          <div className='d-flex align-items-center'>
            <div className='font-weight-bold'>{row.vehicle.number}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Vehicle identity number",
      selector: "vehicle",
      cell: (row) => (
        <div>
          <div className='d-flex align-items-center'>
            <div className='font-weight-bold'>{row.vehicle.identity_number}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Vehicle model",
      selector: "vehicle",
      cell: (row) => (
        <div>
          <div className='d-flex align-items-center'>
            <div className='font-weight-bold'>{row.vehicle.model}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Vehicle type",
      selector: "vehicle",
      cell: (row) => (
        <div>
          <div className='d-flex align-items-center'>
            <div className='font-weight-bold'>{row.vehicle.type}</div>
          </div>
        </div>
      ),
    },
    {
      name: "User name",
      selector: "user",
      cell: (row) => (
        <div>
          <div className='d-flex align-items-center'>
            <div className='font-weight-bold'>{row.user.name}</div>
          </div>
        </div>
      ),
    },

    {
      name: "State",
      cell: (row) => {
        return (
          <Form.Select
            disabled={roles.includes("mechanic") || roles.includes("admin") ? false : true}
            onChange={(e) => {
              updateServiceReqStatus({ id: row._id, body: { state: e.target.value } }).then((res) => {
                console.log("res", res);
                if (res.data.success) {
                  console.log("res.data.success", res.data.success);
                  toastMsg.success("Service request state updated successfully", true);
                } else {
                  toastMsg.error("Service request state update failed", false);
                }
              });
            }}
            aria-label='Default select state'
          >
            <option>Choose State</option>
            <option selected={row.state === "paid" ? "selected" : null} value='paid'>
              paid
            </option>
            <option selected={row.state === "working" ? "selected" : null} value='working'>
              working
            </option>
            <option selected={row.state === "waiting" ? "selected" : null} value='waiting'>
              waiting
            </option>
            <option selected={row.state === "customer out of reach" ? "selected" : null} value='customer out of reach'>
              customer out of reach
            </option>
            <option selected={row.state === "completed" ? "selected" : null} value='completed'>
              completed
            </option>
          </Form.Select>
        );
      },
    },

    {
      name: "Actions",
      cell: (row) => (
        // only mechanic and admin can see this

        <div className='d-flex justify-content-center   w-100 flex-wrap'>
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={roles.includes("receptionist") ? `/service-view/${row._id}` : `/service-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          {(() => {
            if (roles.includes("mechanic") || roles.includes("admin")) {
              return (
                <>
                  <button
                    className='btn-sm btn-danger mx-2 my-1 btn text-white'
                    onClick={async () => {
                      await deleteServiceRequest(row._id).then((res) => {
                        console.log("res", res);
                        if (res.data.success) {
                          window.location.reload();
                        }
                      });
                    }}
                  >
                    <i className='bx bxs-trash me-2'></i>
                    Delete
                  </button>
                </>
              );
            }
          })()}
        </div>
      ),
    },
  ];

  if (serviceRequestLoading || deleteServiceRequestLoading) {
    return <Loader />;
  }

  if (serviceRequestError || deleteServiceRequestError || updateServiceReqStatusError) {
    return <ErrorCard />;
  }

  if (isDeleteServiceRequestSuccess) {
    toastMsg("Service request deleted successfully", true);
  }
  if (isUpdateServiceReqStatusSuccess) {
    toastMsg("Service request status updated successfully", true);
  }

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={serviceRequestData.data} />
    </div>
  );
};

export default List;
