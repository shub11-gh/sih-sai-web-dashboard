import React from "react";

const FilterDropdown = ({ label, options, value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">{label}</option>
    {options.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

export default FilterDropdown;
