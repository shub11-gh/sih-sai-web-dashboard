import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const baseLink = 'flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition-colors';
const activeLink = 'bg-brand-100 text-brand-700 font-semibold shadow-inner';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xl">SAI</div>
        <div>
          <div className="font-bold text-lg text-gray-800">SAI Assessment</div>
          <div className="text-xs text-gray-500">Officials Dashboard</div>
        </div>
      </div>

      <nav className="p-4 flex-1 space-y-2">
        <NavLink to="/" end className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/athletes" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
          <FaUsers />
          <span>Athletes</span>
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
          <FaFileAlt />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
          className="w-full flex items-center gap-3 text-red-600 hover:bg-red-100 px-4 py-3 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
