import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function ReportsPage(){
  const [athletes, setAthletes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [sport, setSport] = useState('');
  const [region, setRegion] = useState('');
  const [flaggedOnly, setFlaggedOnly] = useState(false);

  useEffect(() => {
    axios.get('/athletes').then(res => setAthletes(res.data));
    axios.get('/evaluations').then(res => setEvaluations(res.data));
  }, []);

  const filteredAthletes = useMemo(() => {
    return athletes
      .filter(a => (sport ? a.sport === sport : true))
      .filter(a => (region ? a.region === region : true))
      .filter(a => (flaggedOnly ? a.flagged : true));
  }, [athletes, sport, region, flaggedOnly]);

  const summary = useMemo(() => {
    const total = filteredAthletes.length;
    const avgOverall = total ? Math.round(filteredAthletes.reduce((acc, a) => acc + (a.overall || 0), 0) / total) : 0;
    const flagged = filteredAthletes.filter(a => a.flagged).length;
    const bySport = filteredAthletes.reduce((acc, a) => { acc[a.sport] = (acc[a.sport]||0)+1; return acc; }, {});
    return { total, avgOverall, flagged, bySport };
  }, [filteredAthletes]);

  const exportCSV = () => {
    const headers = ['id','name','sport','team','overall','flagged','gender','age','region'];
    const rows = filteredAthletes.map(a => headers.map(h => a[h]));
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'athletes_report.csv'; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Reports" />
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-white">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300">Sport</label>
                <select value={sport} onChange={e=>setSport(e.target.value)} className="mt-1 w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm text-white focus:outline-none focus:border-brand-500">
                  <option value="">All</option>
                  {[...new Set(athletes.map(a=>a.sport))].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300">Region</label>
                <select value={region} onChange={e=>setRegion(e.target.value)} className="mt-1 w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-sm text-white focus:outline-none focus:border-brand-500">
                  <option value="">All</option>
                  {[...new Set(athletes.map(a=>a.region))].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <label className="inline-flex items-center gap-2 text-dark-300">
                <input type="checkbox" checked={flaggedOnly} onChange={e=>setFlaggedOnly(e.target.checked)} className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-600 focus:ring-brand-500" />
                Flagged only
              </label>
              <button onClick={exportCSV} className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-200">Export CSV</button>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-white">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-dark-600 bg-dark-700">
                <div className="text-sm text-dark-300">Total Athletes</div>
                <div className="text-2xl text-white font-bold">{summary.total}</div>
              </div>
              <div className="p-4 rounded-lg border border-dark-600 bg-dark-700">
                <div className="text-sm text-dark-300">Avg Overall</div>
                <div className="text-2xl text-white font-bold">{summary.avgOverall}</div>
              </div>
              <div className="p-4 rounded-lg border border-dark-600 bg-dark-700">
                <div className="text-sm text-dark-300">Flagged</div>
                <div className="text-2xl text-white font-bold">{summary.flagged}</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Breakdown by sport</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.keys(summary.bySport).length === 0 ? (
                <div className="text-dark-300">No data for current filters.</div>
              ) : (
                Object.entries(summary.bySport).map(([k,v]) => (
                  <div key={k} className="p-4 rounded-lg border border-dark-600 bg-dark-700 flex items-center justify-between">
                    <span className="text-white font-semibold">{k}</span>
                    <span className="text-brand-400">{v}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


