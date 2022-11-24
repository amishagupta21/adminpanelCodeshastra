import React, { useCallback } from "react";
import _debounce from "lodash/debounce";

export const DeBounceSearch = props => {
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue) {
    props.handleSearch(inputValue);
  }

  function handleChange(event) {
    debounceFn(event.target.value);
  }
  return (
    <input
      className="form-control"
      type="text"
      name="search"
      placeholder="search here..."
      onChange={handleChange}
    />
  );
};