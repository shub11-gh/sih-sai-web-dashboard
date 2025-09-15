
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AthletesList from '../components/AthletesList';

export default function AthletesPage(){
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Athletes" />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Athletes</h2>
            <AthletesList />
          </div>
        </div>
      </div>
    </div>
  );
}
