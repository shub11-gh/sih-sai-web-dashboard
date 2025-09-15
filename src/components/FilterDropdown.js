import React from "react";

const FilterDropdown = ({ label, options, value, onChange }) => (
  <div>
    <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">All</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
