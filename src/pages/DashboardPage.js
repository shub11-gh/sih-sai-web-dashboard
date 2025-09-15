import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AthletesList from '../components/AthletesList';
import { FaUsers, FaFlag, FaChartBar } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className={`rounded-full p-3 bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
    <div className="ml-4">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);


export default function DashboardPage(){
  const [stats, setStats] = useState({
    totalAthletes: 0,
    flaggedAthletes: 0,
    avgOverallScore: 0,
  });

  useEffect(() => {
    fetch('/api/athletes')
      .then(res => res.json())
      .then(data => {
        const totalAthletes = data.length;
        const flaggedAthletes = data.filter(a => a.flagged).length;
        const avgOverallScore = data.length > 0 ? Math.round(data.reduce((acc, a) => acc + a.overall, 0) / data.length) : 0;
        setStats({ totalAthletes, flaggedAthletes, avgOverallScore });
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Dashboard" />
        <div className="p-6">
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest Assessments</h2>
            <AthletesList/>
          </div>
        </div>
      </div>
    </div>
  );
}
