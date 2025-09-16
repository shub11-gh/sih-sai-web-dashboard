import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search name/team"
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border border-dark-600 bg-dark-700 text-white p-2 rounded placeholder-dark-400 focus:outline-none focus:border-brand-500"
  />
);

export default SearchBar;
