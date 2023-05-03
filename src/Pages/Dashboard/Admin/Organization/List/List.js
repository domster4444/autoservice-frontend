import React from "react";

import { useGetOrganizationQuery, useDeleteOrganizationMutation } from "redux/api/organization/organizationApi";
import { Link } from "react-router-dom";

//* components
import Table from "components/Table";
import Loader from "components/Loader/Loader";
import ErrorCard from "components/ErrorCard/ErrorCard";
import toastMsg from "library/utilities/toastMsg";

const List = () => {
  const [deleteOrganization, { isLoading: isDelOrgLoading, isError: isDelOrgError }] = useDeleteOrganizationMutation();
  const { data: organizationData, isLoading: organizationLoading, isError: organizationError } = useGetOrganizationQuery("organization");

  const convertDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  };

  const columns = [
    {
      name: "Organization",
      selector: "name",
      sortable: true,
    },

    {
      name: "Contract Details",
      selector: "contracts",
      sortable: true,
      cell: (d) => (
        <span>
          {d.contracts.map((contract) => (
            <div className='position-relative' style={{ background: "#0f5288", margin: ".2rem", padding: ".5rem", borderRadius: ".55rem" }}>
              <div className='position-absolute d-flex justify-content-end' style={{ right: "-2rem" }}>
                <Link to={`/contract-update/${contract._id}/${d._id}`}>
                  <i
                    style={{
                      borderRadius: "50%",
                      color: "#0f5288",
                      cursor: "pointer",
                    }}
                    className='btstrp-shadow-effect ms-3 fs-4 top-0  bx bxs-info-circle'
                  ></i>
                </Link>
              </div>

              <span style={{ color: "#ffffff" }}> Start Date: {convertDate(contract.start_date)}</span>
              <br />
              <span style={{ color: "#ffffff" }}>
                End Date: {convertDate(contract.end_date)}
                <br />
              </span>
            </div>
          ))}
        </span>
      ),
    },

    {
      name: "Users Details",
      selector: "user",
      sortable: true,
      cell: (d) => (
        <span>
          {d.user.map((user) => (
            <div style={{ background: "#0f5288", margin: ".2rem", padding: ".5rem", borderRadius: ".55rem" }}>
              <span style={{ color: "#ffffff" }}>Name: {user.name}</span>
              <br />
            </div>
          ))}
        </span>
      ),
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
    //           navigate(`/organization-update/${row._id}`);
    //         }}
    //       >
    //         <i className='bx bxs-edit me-2'></i>
    //         Edit
    //       </button>

    //       <ModalBox
    //         btnName={"delete"}
    //         deleteRecordCall={() => {
    //           alert("delete function called");
    //         }}
    //         row={row}
    //       >
    //         <AlertBody>
    //           <section>
    //             <p>Do you really want to delete the following record ?</p>
    //             <div>
    //               <b>Organization name : </b> <span>{row.name}</span>
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
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/organization-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <button
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={async () => {
              await deleteOrganization(row._id).then((res) => {
                console.log("🌄 response when deletion query func called", res);
                if (res.data.success) {
                  toastMsg("Organization deleted successfully", true);
                  window.location.reload();
                } else {
                  toastMsg("Error while deleteing organization", false);
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

  if (organizationLoading || isDelOrgLoading) return <Loader />;

  if (isDelOrgError || organizationError) {
    return <ErrorCard />;
  }

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={organizationData.data} />
    </div>
  );
};

export default List;
