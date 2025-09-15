const Badge = ({ label, color = "indigo" }) => (
  <span
    className={`px-2 py-1 text-sm font-medium rounded-full bg-${color}-100 text-${color}-800`}>
    {label}
  </span>
);
export default Badge;
