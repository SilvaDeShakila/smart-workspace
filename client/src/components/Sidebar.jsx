import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTasks, FaCalendarAlt, FaFileAlt, FaComments, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FaHome },
  { to: '/dashboard/projects', label: 'Projects', icon: FaProjectDiagram },
  { to: '/dashboard/tasks', label: 'Tasks', icon: FaTasks },
  { to: '/dashboard/meetings', label: 'Meetings', icon: FaCalendarAlt },
  { to: '/dashboard/documents', label: 'Documents', icon: FaFileAlt },
  { to: '/dashboard/chat', label: 'Chat', icon: FaComments },
  { to: '/dashboard/reports', label: 'Reports', icon: FaChartBar },
  { to: '/dashboard/settings', label: 'Settings', icon: FaCog }
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 px-6 py-7 text-slate-200">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white">Smart Workspace</h2>
        <p className="mt-2 text-sm text-slate-500">Team operations suite</p>
      </div>
      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
