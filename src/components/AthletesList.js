import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "./Rating";
import Badge from "./Badge";

const AthletesList = () => {
  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
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
    let results = athletes
      .filter(athlete =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(athlete =>
        (filters.gender ? athlete.gender === filters.gender : true) &&
        (filters.region ? athlete.region === filters.region : true) &&
        (filters.ageGroup ? isInAgeGroup(athlete.age, filters.ageGroup) : true)
      );
    setFilteredAthletes(results);
  }, [searchTerm, athletes, filters]);

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
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search athletes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
        />
        <button onClick={exportToCSV} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">Export to CSV</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <select name="gender" onChange={handleFilterChange} className="px-4 py-2 border rounded-md">
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="region" onChange={handleFilterChange} className="px-4 py-2 border rounded-md">
          <option value="">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <select name="ageGroup" onChange={handleFilterChange} className="px-4 py-2 border rounded-md">
          <option value="">All Ages</option>
          <option value="Under 18">Under 18</option>
          <option value="18-25">18-25</option>
          <option value="26-30">26-30</option>
          <option value="Over 30">Over 30</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => requestSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Name
              </th>
              <th onClick={() => requestSort('sport')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Sport
              </th>
              <th onClick={() => requestSort('team')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Team
              </th>
              <th onClick={() => requestSort('overall')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Overall
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flagged
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4">No results</td></tr>
            ) : (
              currentItems.map(athlete => (
                <tr key={athlete.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href=`/athlete/${athlete.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{athlete.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{athlete.sport}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{athlete.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Rating value={athlete.overall} maxValue={100} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {athlete.flagged ? <Badge label="Yes" color="red" /> : <Badge label="No" color="green" />}
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
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AthletesList;
