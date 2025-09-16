const Badge = ({ label, color = "indigo" }) => {
  const colorClasses = {
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    green: "bg-green-500/20 text-green-400 border border-green-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    indigo: "bg-brand-500/20 text-brand-400 border border-brand-500/30"
  };
  
  return (
    <span className={`px-2 py-1 text-sm font-medium rounded-full ${colorClasses[color] || colorClasses.indigo}`}>
      {label}
    </span>
  );
};
export default Badge;
