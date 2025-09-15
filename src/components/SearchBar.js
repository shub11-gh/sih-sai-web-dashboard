import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search name/team"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border p-2 rounded"
  />
);

export default SearchBar;
