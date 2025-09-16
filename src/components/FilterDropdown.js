import React from "react";

const FilterDropdown = ({ label, options, value, onChange, dark }) => (
  <div>
    <label htmlFor={label.toLowerCase()} className={`block text-sm font-medium ${dark ? 'text-dark-300' : 'text-gray-700'}`}>
      {label}
    </label>
    <select
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md ${dark ? 'bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-brand-500' : 'border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'}`}
    >
      <option value="">All</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
