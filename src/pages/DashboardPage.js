import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ResultsTable from '../components/ResultsTable';

export default function DashboardPage(){
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Dashboard" />
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-white">
            <div className="text-slate-500 text-sm">Total Athletes</div>
            <div className="text-3xl font-bold">Live</div>
          </div>
          <div className="p-4 border rounded bg-white">
            <div className="text-slate-500 text-sm">Flagged</div>
            <div className="text-3xl font-bold">Live</div>
          </div>
          <div className="p-4 border rounded bg-white">
            <div className="text-slate-500 text-sm">Avg Overall</div>
            <div className="text-3xl font-bold">Live</div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white border rounded p-4">
            <div className="mb-3 font-semibold">Latest Assessments</div>
            <ResultsTable/>
          </div>
        </div>
      </div>
    </div>
  );
}
