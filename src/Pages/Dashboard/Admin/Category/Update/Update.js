import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "redux/api/category/categoryApi";

import toastMsg from "library/utilities/toastMsg";
import FormErrorTag from "components/FormErrorTag";

const CreateForm = () => {
  const { id } = useParams();
  const [updateCategory, { isLoading: isUpdateCategoryLoading, isError: isUpdateCategoryError }] = useUpdateCategoryMutation();
  const { data: categoryData, isLoading: categoryLoading, isError: isCategoryError } = useGetSingleCategoryQuery(id);
  const [formErrorMsg, setFormErrorMsg] = useState({
    status: false,
    message: "",
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CATEGORY_TITLE":
        return {
          ...state,
          name: action.payload,
        };
      case "SET_CATEGORY_DESCRIPTION":
        return {
          ...state,
          description: action.payload,
        };

      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    description: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, description } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("📝 create service data starts here 📝", state, "📝 create service data ends here 📝");

    const errorMessages = {
      category: "Please enter category name",
      issue: "Please select at least one issue",
    };

    const selectedInputs = {
      category: name,
      description: description,
    };

    const errorMessage = Object.keys(selectedInputs).find((key) => !selectedInputs[key]);

    if (errorMessage) {
      setFormErrorMsg({
        status: true,
        message: errorMessages[errorMessage],
      });
      return;
    }

    setFormErrorMsg({
      status: false,
      message: "",
    });

    // console.log("🌅 DATA TO UPDATE", state);
    const dataToUpdate = {
      id: id,
      body: {
        name: name,
        description: description,
      },
    };

    updateCategory(dataToUpdate).then((res) => {
      // console.log("🌅 RES", res);
      if (res.data) {
        toastMsg(res.data.message, true);
        window.location.href = "/category-list";
      } else if (res.error) {
        toastMsg(res.error.data.message, false);
      } else {
        toastMsg("Error while updating", false);
      }
    });
  };

  useEffect(() => {
    if (categoryData) {
      dispatch({ type: "SET_CATEGORY_TITLE", payload: categoryData.data.name });
      dispatch({ type: "SET_CATEGORY_DESCRIPTION", payload: categoryData.data.description });
    }
  }, [categoryData]);

  if (categoryLoading) {
    return <div>Loading all categories...</div>;
  }
  if (isUpdateCategoryLoading) {
    return <div>Updating category data...</div>;
  }

  if (isCategoryError) {
    return <div>Error occured when fetching all category data</div>;
  }
  if (isUpdateCategoryError) {
    return <div>Error occured when updating category data</div>;
  }

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
                id='category'
                placeholder='Category name'
                value={name}
                onChange={(e) => {
                  dispatch({ type: "SET_CATEGORY_TITLE", payload: e.target.value });
                }}
              />
              <label htmlFor='address'>Category name</label>
            </div>
            <div className='col-12 col-sm w-100 form-floating'>
              <textarea
                required
                id='message'
                className='w-100 mt-2 p-0 form-field bg-transparent py-3'
                placeholder='Description'
                rows='6'
                value={description}
                onChange={(e) => {
                  dispatch({ type: "SET_CATEGORY_DESCRIPTION", payload: e.target.value });
                }}
              ></textarea>
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
                Add
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateForm;
