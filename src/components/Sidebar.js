import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const baseLink = 'flex items-center gap-3 px-4 py-2 rounded text-slate-700 hover:bg-brand-50';
const active = 'bg-brand-100 text-brand-700 font-semibold shadow-sm';

export default function Sidebar(){
  return (
    <aside className="w-60 border-r min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b">
        <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">SA</div>
        <div>
          <div className="font-bold text-lg">Sports AI</div>
          <div className="text-xs text-slate-500">Officials Dashboard</div>
        </div>
      </div>

      <nav className="p-3 flex-1 space-y-1">
        <NavLink to="/" end className={({isActive})=>`${baseLink} ${isActive?active:''}`}>
          <FaTachometerAlt className="text-sm" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/athletes" className={({isActive})=>`${baseLink} ${isActive?active:''}`}>
          <FaUsers className="text-sm" />
          <span>Athletes</span>
        </NavLink>

        <NavLink to="/reports" className={({isActive})=>`${baseLink} ${isActive?active:''}`}>
          <FaFileAlt className="text-sm" />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={({isActive})=>`${baseLink} ${isActive?active:''}`}>
          <FaCog className="text-sm" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="p-3 border-t">
        <button
          onClick={()=>{ localStorage.removeItem('token'); window.location.href='/login'; }}
          className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
