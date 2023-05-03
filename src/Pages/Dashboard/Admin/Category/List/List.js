import React from "react";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "redux/api/category/categoryApi";
import toastMsg from "library/utilities/toastMsg";
//* components
import Table from "components/Table";

const List = () => {
  const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useGetCategoryQuery();
  const [deleteCategory, { isLoading: isDeleteCategoryLoading, isError: isCategoryError }] = useDeleteCategoryMutation();

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className='d-flex justify-content-center   w-100 flex-wrap'>
          <a className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#50B351" }} href={`/category-update/${row._id}`}>
            <i className='bx bxs-edit me-2'></i>
            Edit
          </a>
          <button
            className='btn-sm btn-danger mx-2 my-1 btn text-white'
            onClick={() => {
              deleteCategory(row._id).then((res) => {
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

  if (categoryLoading) return <div>Loading...</div>;

  return (
    <div className='animate__animated animate__fadeInUp'>
      <Table columns={columns} data={categoryData.data} />
    </div>
  );
};

export default List;
