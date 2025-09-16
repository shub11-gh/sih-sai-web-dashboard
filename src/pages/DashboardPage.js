import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AthletesList from '../components/AthletesList';
import { FaUsers, FaFlag, FaChartBar } from 'react-icons/fa';
import FilterDropdown from '../components/FilterDropdown';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 flex items-center border border-dark-700 hover:border-brand-500/50 transition-colors">
    <div className={`rounded-full p-3 bg-brand-500/20 text-brand-400`}>
      {icon}
    </div>
    <div className="ml-4">
      <div className="text-sm font-medium text-dark-400">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  </div>
);


export default function DashboardPage(){
  const [stats, setStats] = useState({
    totalAthletes: 0,
    flaggedAthletes: 0,
    avgOverallScore: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ gender: '', region: '', ageGroup: '' });

  useEffect(() => {
    fetch('/athletes')
      .then(res => res.json())
      .then(data => {
        const totalAthletes = data.length;
        const flaggedAthletes = data.filter(a => a.flagged).length;
        const avgOverallScore = data.length > 0 ? Math.round(data.reduce((acc, a) => acc + a.overall, 0) / data.length) : 0;
        setStats({ totalAthletes, flaggedAthletes, avgOverallScore });
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Dashboard" onSearch={setSearchQuery} />
        <div className="p-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-4 border border-dark-700 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FilterDropdown
                label="Gender"
                options={["Male", "Female"]}
                value={filters.gender}
                onChange={(v)=>setFilters(prev=>({ ...prev, gender: v }))}
                dark
              />
              <FilterDropdown
                label="Region"
                options={["North","South","East","West"]}
                value={filters.region}
                onChange={(v)=>setFilters(prev=>({ ...prev, region: v }))}
                dark
              />
              <FilterDropdown
                label="Age Group"
                options={["Under 18","18-25","26-30","Over 30"]}
                value={filters.ageGroup}
                onChange={(v)=>setFilters(prev=>({ ...prev, ageGroup: v }))}
                dark
              />
              <FilterDropdown
                label="Test Type"
                options={["Speed","Agility","Endurance","Power","Flexibility"]}
                value={filters.testType}
                onChange={(v)=>setFilters(prev=>({ ...prev, testType: v }))}
                dark
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Athletes"
              value={stats.totalAthletes}
              color="blue"
              icon={<FaUsers className="h-6 w-6" />}
            />
            <StatCard
              title="Flagged Athletes"
              value={stats.flaggedAthletes}
              color="red"
              icon={<FaFlag className="h-6 w-6" />}
            />
            <StatCard
              title="Avg. Overall Score"
              value={stats.avgOverallScore}
              color="green"
              icon={<FaChartBar className="h-6 w-6" />}
            />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Latest Assessments</h2>
            <AthletesList externalSearch={searchQuery} externalFilters={filters} controlsHidden={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
