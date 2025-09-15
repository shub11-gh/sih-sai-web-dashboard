import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PerformanceChart from "../components/PerformanceChart";

const AthleteProfilePage = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/athletes/${id}`).then(res => setAthlete(res.data));
    axios.get(`/metrics?athleteId=${id}`).then(res => setHistory(res.data));
  }, [id]);

  if (!athlete) return <p>Loading athlete info...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{athlete.name}</h2>
      <p><b>Sport:</b> {athlete.sport}</p>
      <p><b>Team:</b> {athlete.team}</p>
      <p><b>Age:</b> {athlete.age}</p>
      <p><b>Flagged:</b> {athlete.flagged ? "Yes 🚩" : "No"}</p>

      <h3 className="mt-6 text-xl font-semibold">Test Results History</h3>
      <ul className="list-disc list-inside mb-6">
        {history.map(m => (
          <li key={m.id}>
            {m.testType} - {m.score} on {m.date}
            {m.cheatFlag && <span className="text-red-600 font-bold ml-2">🚩</span>}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Performance Trend</h3>
      <PerformanceChart data={history} />
    </div>
  );
};

export default AthleteProfilePage;
