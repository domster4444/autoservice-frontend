import React, { useState } from "react";

import Select from "react-select";

const placeholderData = [{ value: "Value", label: "Value" }];

export default ({ optionList, placeholder = "select...", selectedOption, dispatch, useReducerDispatchType }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <>
      <Select
        required
        className='basic-single my-0'
        classNamePrefix='select'
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name='color'
        isMulti
        options={optionList ? optionList : placeholderData}
        value={selectedOption}
        onChange={(value) => {
          dispatch({ type: useReducerDispatchType, payload: value });
        }}
      />

      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em",
        }}
      ></div>
    </>
  );
};
