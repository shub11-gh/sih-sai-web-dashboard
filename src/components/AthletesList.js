import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "./Rating";
import Badge from "./Badge";

const AthletesList = ({ externalSearch, externalFilters, controlsHidden = false }) => {
  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    testType: "",
    ageGroup: "",
    gender: "",
    region: ""
  });

  useEffect(() => {
    axios.get("/athletes")
      .then(response => {
        setAthletes(response.data);
        setFilteredAthletes(response.data);
      })
      .catch(error => {
        console.error("Error fetching athletes:", error);
      });
  }, []);

  useEffect(() => {
    axios.get('/evaluations')
      .then(res => setEvaluations(res.data))
      .catch(() => {});
  }, []);

  // Sync external controls if provided
  useEffect(() => {
    if (typeof externalSearch === 'string') {
      setSearchTerm(externalSearch);
      setCurrentPage(1);
    }
  }, [externalSearch]);

  useEffect(() => {
    if (externalFilters && typeof externalFilters === 'object') {
      setFilters(prev => ({ ...prev, ...externalFilters }));
      setCurrentPage(1);
    }
  }, [externalFilters]);

  useEffect(() => {
    // Basic athlete filters
    let results = athletes
      .filter(athlete =>
        athlete.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      )
      .filter(athlete =>
        (filters.gender ? athlete.gender === filters.gender : true) &&
        (filters.region ? athlete.region === filters.region : true) &&
        (filters.ageGroup ? isInAgeGroup(athlete.age, filters.ageGroup) : true)
      )
      .map(athlete => {
        // Enrich with latest evaluation
        const evals = evaluations.filter(e => e.athleteId === athlete.id && (filters.testType ? e.testType === filters.testType : true));
        const latest = evals.sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        return {
          ...athlete,
          latestDate: latest ? latest.date : '',
          latestScore: latest ? latest.score : null,
          latestTestType: latest ? latest.testType : '',
          latestCheat: latest ? !!latest.cheatFlag : false,
        };
      });
    setFilteredAthletes(results);
  }, [searchTerm, athletes, filters, evaluations]);

  const isInAgeGroup = (age, ageGroup) => {
    if (ageGroup === "Under 18") return age < 18;
    if (ageGroup === "18-25") return age >= 18 && age <= 25;
    if (ageGroup === "26-30") return age >= 26 && age <= 30;
    if (ageGroup === "Over 30") return age > 30;
    return true;
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedAthletes = [...filteredAthletes].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredAthletes(sortedAthletes);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAthletes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAthletes.length / itemsPerPage);

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + [Object.keys(currentItems[0]), ...currentItems.map(item => Object.values(item))]
        .map(e => e.join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "athletes.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      {!controlsHidden && (
        <>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-dark-600 bg-dark-700 text-white rounded-md w-full md:w-1/3 placeholder-dark-400 focus:outline-none focus:border-brand-500"
            />
            <button onClick={exportToCSV} className="ml-4 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-md transition-all duration-200">Export to CSV</button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <select name="gender" onChange={handleFilterChange} className="px-4 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:border-brand-500">
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select name="region" onChange={handleFilterChange} className="px-4 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:border-brand-500">
              <option value="">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
            <select name="ageGroup" onChange={handleFilterChange} className="px-4 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:border-brand-500">
              <option value="">All Ages</option>
              <option value="Under 18">Under 18</option>
              <option value="18-25">18-25</option>
              <option value="26-30">26-30</option>
              <option value="Over 30">Over 30</option>
            </select>
          </div>
        </>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark-800 rounded-lg shadow-card-dark overflow-hidden border border-dark-700">
          <thead className="bg-dark-700">
            <tr>
              <th onClick={() => requestSort('name')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Name
              </th>
              <th onClick={() => requestSort('sport')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Sport
              </th>
              <th onClick={() => requestSort('team')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Team
              </th>
              <th onClick={() => requestSort('latestTestType')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Test
              </th>
              <th onClick={() => requestSort('latestDate')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Latest Date
              </th>
              <th onClick={() => requestSort('latestScore')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Score
              </th>
              <th onClick={() => requestSort('overall')} className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider cursor-pointer hover:text-brand-400 transition-colors">
                Overall
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                Flagged
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                Cheat
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {currentItems.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4 text-dark-400">No results</td></tr>
            ) : (
              currentItems.map(athlete => (
                <tr key={athlete.id} className="hover:bg-dark-700 cursor-pointer transition-colors" onClick={() => window.location.href=`/athlete/${athlete.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{athlete.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">{athlete.sport}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">{athlete.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">{athlete.latestTestType || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">{athlete.latestDate || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">{athlete.latestScore ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Rating value={athlete.overall} maxValue={100} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {athlete.flagged ? <Badge label="Yes" color="red" /> : <Badge label="No" color="green" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {athlete.latestCheat ? <Badge label="Cheat" color="red" /> : <span className="text-dark-400 text-sm">-</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-dark-300 bg-dark-700 border border-dark-600 rounded-md disabled:opacity-50 hover:bg-dark-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-dark-300">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-dark-300 bg-dark-700 border border-dark-600 rounded-md disabled:opacity-50 hover:bg-dark-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AthletesList;
