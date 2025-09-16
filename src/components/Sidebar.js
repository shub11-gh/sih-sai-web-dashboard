import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCog, FaSignOutAlt, FaBullhorn } from 'react-icons/fa';

const baseLink = 'flex items-center gap-3 px-4 py-3 rounded-lg text-dark-300 hover:bg-brand-500/20 hover:text-brand-400 transition-colors';
const activeLink = 'bg-brand-500/30 text-brand-400 font-semibold shadow-inner border-l-4 border-brand-500';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-dark-800 shadow-card-dark flex flex-col border-r border-dark-700">
      <div className="p-6 flex items-center gap-4 border-b border-dark-700">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">SAI</div>
        <div>
          <div className="font-bold text-lg text-white">SAI Assessment</div>
          <div className="text-xs text-dark-400">Officials Dashboard</div>
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

        <NavLink to="/announcements" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}>
          <FaBullhorn />
          <span>Announcements</span>
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

      <div className="p-4 border-t border-dark-700">
        <button
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
          className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/20 hover:text-red-300 px-4 py-3 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
