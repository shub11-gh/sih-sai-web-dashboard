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
    let results = athletes.filter(athlete =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAthletes(results);
  }, [searchTerm, athletes]);

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
                <tr key={athlete.id} className="hover:bg-gray-50">
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
