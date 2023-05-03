import React from "react";
import { useDeleteCategoryMutation } from "redux/api/category/categoryApi";
import { useGetAllEmployeeQuery, useDeleteSingleEmployeeMutation } from "redux/api/employee/employeeApi";

import toastMsg from "library/utilities/toastMsg";
//* components
import Table from "components/Table";

const List = () => {
  const { data: employeeData, isLoading: employeeLoading, isError: employeeError } = useGetAllEmployeeQuery();
  const [deleteEmployee, { isLoading: isDeleteEmployeeLoading, isError: isDeleteEmployeeError }] = useDeleteSingleEmployeeMutation();

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Desginations",
      selector: "designation",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className='d-flex justify-content-center   w-100 flex-wrap'>
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/employee-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <button
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={() => {
              deleteEmployee(row._id).then((res) => {
                if (res.data.success) {
                  window.location.reload();
                } else {
                  toastMsg("Error occured while deleting category.", res.data.message);
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

  if (employeeLoading) return <div>Loading...</div>;

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={employeeData.data} />
    </div>
  );
};

export default List;
