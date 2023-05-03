import React from "react";

import { useGetUserByRoleQuery } from "redux/api/users/userApi";
import { dateFormatter } from "library/utilities/dateFormatter";
import { globalConstant } from "constant/constant";
import Table from "components/Table";
import toastMsg from "library/utilities/toastMsg";

import { useDeleteUserMutation } from "redux/api/users/userApi";
import ErrorCard from "components/ErrorCard/ErrorCard";
import Loader from "components/Loader/Loader";

const List = () => {
  const [deleteRecord, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();
  const { data: userData, isLoading: userLoading, isError: userError } = useGetUserByRoleQuery("mechanic");

  const columns = [
    {
      name: "Profile",
      selector: "avatar",
      sortable: true,

      cell: (row, index) => {
        return (
          <a className='avatar d-flex justify-content-center' href={`${globalConstant.serverUrl}/storage/profile_pics/${row.avatar}`}>
            <img style={{ borderRadius: ".5rem", height: "100%" }} src={`${globalConstant.serverUrl}/storage/profile_pics/${row.avatar}`} alt='avatar' />
          </a>
        );
      },
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Phone number",
      selector: "phone_number",
      sortable: true,
    },

    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Roles",
      selector: "roles",
      sortable: true,
      cell: (d) => <span>{d.roles.join(", ")}</span>,
    },
    {
      name: "Created at",
      selector: "created_at",
      sortable: true,
      cell: (d) => <span>{dateFormatter(d.created_at)}</span>,
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
    //           navigate(`/users-update/${row._id}`);
    //         }}
    //       >
    //         <i className='bx bxs-edit me-2'></i>
    //         Edit
    //       </button>

    //       <ModalBox
    //         btnName={"delete"}
    //         deleteRecordCall={() => {
    //           deleteRecord(row._id);
    //         }}
    //         row={row}
    //       >
    //         <AlertBody>
    //           <section>
    //             <p>Do you really want to delete the following record ?</p>
    //             <div>
    //               <b>Name : </b> <span>{row.name}</span>
    //             </div>
    //             <div>
    //               <b>Phone number : </b> <span>{row.phone_number}</span>
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
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/users-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <button
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={() => {
              deleteRecord(row._id).then((res) => {
                console.log(res);
                if (res.error) {
                  toastMsg(res.error.data.message, false);
                } else {
                  toastMsg(res.data.message, true);
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

  if (isDeleteUserLoading | userLoading) {
    return <Loader />;
  }

  if (userError) {
    return <ErrorCard />;
  }

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={userData} />
    </div>
  );
};

export default List;
