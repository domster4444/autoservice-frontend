import React from "react";
import { globalConstant } from "constant/constant";

import { useGetVehicleQuery, useDeleteVehicleMutation, useUpdateVehicleStatusMutation } from "redux/api/vehicle/vehicleApi";

//* components
import Table from "components/Table";
import toastMsg from "library/utilities/toastMsg";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";

const List = () => {
  const { data: vehicleData, isLoading: vehicleLoading, isError: vehicleError } = useGetVehicleQuery();
  const [deleteVehicle, { isLoading: isDeleteVehicleLoading, isError: isDeleteVehicleError }] = useDeleteVehicleMutation();
  const [updateVehicleVerificationStatus, { isError: isUpdateVehicleVerificationStatusError }] = useUpdateVehicleStatusMutation();

  const columns = [
    {
      name: "Vehicle image",
      selector: "vehicle_image",
      sortable: true,

      cell: (row, index) => {
        return (
          <a className='avatar' href={`${globalConstant.serverUrl}/storage/vehicles/${row.vehicle_image}`}>
            <img style={{ borderRadius: ".5rem", height: "40px" }} src={`${globalConstant.serverUrl}/storage/vehicles/${row.vehicle_image}`} alt='avatar' />
          </a>
        );
      },
    },
    {
      name: "Vehicle number",
      selector: "number",
      sortable: true,
    },
    {
      name: "Identity number",
      selector: "identity_number",
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    // {
    //   name: "User",
    //   selector: "user_id",
    //   sortable: true,
    // },
    // {
    //   name: "Organization",
    //   selector: "organization_id",
    //   sortable: true,
    // },
    {
      name: "Bluebook",
      selector: "bluebook",
      sortable: true,
      cell: (row, index) => {
        return (
          <a href={`${globalConstant.serverUrl}/api/v1/download/vehicles/${row.bluebook}`} download>
            <i class='bx bxs-download me-2'></i>
            Download
          </a>
        );
      },
    },
    {
      name: "Vehicle image",
      selector: "vehicle_image",
      sortable: true,
      cell: (row, index) => {
        return (
          <a href={`${globalConstant.serverUrl}/api/v1/download/vehicles/${row.vehicle_image}`} download>
            <i class='bx bxs-download me-2'></i>
            Download
          </a>
        );
      },
    },
    {
      name: "State",
      selector: "state",
      sortable: true,
      cell: (row, index) => {
        function toggleVerification(indexNo) {
          var badge = document.getElementsByClassName("verification-badge")[index];
          badge.classList.toggle("badge-verified");
          badge.classList.toggle("badge-unverified");
          var badgeText = badge.querySelector("div");

          if (badgeText.textContent === "verified") {
            badgeText.textContent = "not verified";

            updateVehicleVerificationStatus({
              id: row._id,
              body: {
                is_verified: false,
              },
            }).then((res) => {
              if (res.data.success) {
                toastMsg(res.data.message, true);
              } else {
                toastMsg("Couldn't update vehicle verification status.", false);
              }
            });
          } else {
            badgeText.textContent = "verified";
            updateVehicleVerificationStatus({
              id: row._id,
              body: {
                is_verified: true,
              },
            }).then((res) => {
              if (res.data.success) {
                toastMsg(res.data.message, true);
              } else {
                toastMsg("Couldn't update vehicle verification status.", false);
              }
            });
          }
        }

        return (
          <div>
            {row.is_verified === true ? (
              <div onClick={toggleVerification} className='cursor pb-2 verification-badge d-flex align-items-center text-white badge-verified'>
                <div>verified</div>
              </div>
            ) : (
              <div onClick={toggleVerification} className='cursor pb-2 verification-badge d-flex align-items-center text-white badge-unverified'>
                <div>not verified</div>
              </div>
            )}
          </div>
        );
      },
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div className='d-flex justify-content-center   w-100 flex-wrap'>
    //       <button
    //         type='button'
    //         className='btn-sm mx-2 my-1 btn text-white'
    //         style={{ background: "#50B351" }}
    //         onClick={() => {
    //           navigate(`/vehicle-update/${row._id}`);
    //         }}
    //       >
    //         <i className='bx bxs-edit me-2'></i>
    //         Edit
    //       </button>

    //       <ModalBox btnName={"delete"} row={row}>
    //         <AlertBody>
    //           <section>
    //             <p>Do you really want to delete the following record ?</p>
    //             <div>
    //               <b>vehicle number : </b> <span>{row.number}</span>
    //             </div>
    //             <div>
    //               <b>vehicle model : </b> <span>{row.model}</span>
    //             </div>
    //           </section>
    //         </AlertBody>
    //       </ModalBox>
    //     </div>
    //   ),
    // },
    {
      name: "Actions",
      cell: (row) => (
        <div className='d-flex justify-content-center   w-100 flex-wrap'>
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/vehicle-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <button
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={async () => {
              await deleteVehicle(row._id).then((res) => {
                if (res.data.success) {
                  toastMsg("success", res.data.message);
                  window.location.reload();
                }
              });
            }}
          >
            <i className='bx bxs-trash me-2'></i>
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (vehicleLoading || isDeleteVehicleLoading) {
    return <Loader />;
  }
  if (vehicleError) {
    return <ErrorCard />;
  }
  if (isUpdateVehicleVerificationStatusError || isDeleteVehicleError) {
    toastMsg("Something went wrong", false);
  }

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={vehicleData.data} />
    </div>
  );
};

export default List;
