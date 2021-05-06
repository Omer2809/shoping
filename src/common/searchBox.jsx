import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const SearchBox = ({ value, onChange ,placeholder}) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control mb-3 mt-2 mx-1 p-1 searchBox"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      
    />
  );
};

export default SearchBox;
