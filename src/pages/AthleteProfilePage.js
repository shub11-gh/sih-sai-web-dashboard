import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PerformanceChart from "../components/PerformanceChart";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AthleteProfilePage = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/athletes/${id}`).then(res => setAthlete(res.data));
    axios.get(`/evaluations?athleteId=${id}`).then(res => setHistory(res.data));
  }, [id]);

  if (!athlete) return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Athlete Profile" />
        <div className="p-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700">
            <p className="text-white">Loading athlete info...</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar/>
      <div className="flex-1">
        <Topbar title="Athlete Profile" />
        <div className="p-6">
          <div className="bg-dark-800 rounded-lg shadow-card-dark p-6 border border-dark-700">
            <h2 className="text-3xl font-bold mb-2 text-white">{athlete.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                <p className="text-dark-300"><b className="text-white">Sport:</b> {athlete.sport}</p>
                <p className="text-dark-300"><b className="text-white">Team:</b> {athlete.team}</p>
                <p className="text-dark-300"><b className="text-white">Age:</b> {athlete.age}</p>
                <p className="text-dark-300"><b className="text-white">Flagged:</b> {athlete.flagged ? <span className="text-red-400">Yes 🚩</span> : <span className="text-green-400">No</span>}</p>
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-white mb-4">Test Results History</h3>
            <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 mb-6">
              <ul className="space-y-2">
                {history.map(m => (
                  <li key={m.id} className="text-dark-300 flex items-center justify-between">
                    <span>{m.testType} - {m.score} on {m.date}</span>
                    {m.cheatFlag && <span className="text-red-400 font-bold">🚩</span>}
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-white">Performance Trend</h3>
            <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
              <PerformanceChart data={history} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfilePage;
