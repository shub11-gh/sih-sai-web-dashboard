
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AthletesList from '../components/AthletesList';

export default function AthletesPage(){
  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Athletes" />
        <div className="p-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700">
            <h2 className="text-xl font-semibold mb-4 text-white">All Athletes</h2>
            <AthletesList />
          </div>
        </div>
      </div>
    </div>
  );
}
