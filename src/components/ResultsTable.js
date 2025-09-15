import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import { CSVLink } from "react-csv";

const ResultsTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [testType, setTestType] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [sortKey, setSortKey] = useState("overall");
  const [sortDir, setSortDir] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/athletes").then(res => setData(res.data));
  }, []);

  const filtered = data
    .filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(a => (testType ? a.testType === testType : true))
    .filter(a => (ageRange ? a.ageRange === ageRange : true))
    .filter(a => (gender ? a.gender === gender : true))
    .filter(a => (region ? a.region === region : true))
    .sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortDir === "asc" ? diff : -diff;
    });

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "testType", label: "Test" },
    { key: "overall", label: "Score" },
    { key: "date", label: "Date" },
    { key: "region", label: "Region" },
    { key: "flagged", label: "Flag" },
  ];

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <div className="min-w-[220px]"><SearchBar value={search} onChange={setSearch} /></div>
        <FilterDropdown
          label="Test Type"
          options={["Speed","Strength","Stamina"]}
          value={testType}
          onChange={setTestType}
        />
        <FilterDropdown
          label="Age Range"
          options={["<18","18–25","26–35",">35"]}
          value={ageRange}
          onChange={setAgeRange}
        />
        <FilterDropdown
          label="Gender"
          options={["Male","Female","Other"]}
          value={gender}
          onChange={setGender}
        />
        <FilterDropdown
          label="Region"
          options={["North","South","East","West"]}
          value={region}
          onChange={setRegion}
        />
        <div>
          <label>Sort by:</label>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
            className="border p-2 rounded ml-1"
          >
            <option value="overall">Overall</option>
            <option value="date">Date</option>
          </select>
          <button
            onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            className="ml-2 p-2 border rounded"
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-3">
        <CSVLink
          data={filtered}
          filename="athletes.csv"
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded shadow-sm"
        >
          Export CSV
        </CSVLink>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-slate-600">No results</div>
        ) : (
          filtered.map(a => (
            <div
              key={a.id}
              onClick={() => navigate(`/athletes/${a.id}`)}
              className="p-4 bg-white rounded shadow-card hover:shadow-lg cursor-pointer border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-semibold">{a.name?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="font-semibold text-sm">{a.name} <span className="text-xs text-slate-500">#{a.id}</span></div>
                    <div className="text-xs text-slate-500">{a.testType} • {a.region} • {a.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-lg font-bold text-brand-700">{a.overall}</div>
                    <div className="text-xs text-slate-500">Score</div>
                  </div>

                  <div className="w-24 text-center">
                    {a.flagged ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium">🚩 Flagged</span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">✓ Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsTable;
