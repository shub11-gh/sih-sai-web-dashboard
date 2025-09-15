import React, { useEffect, useState } from "react";
import axios from "axios";

const AthletesList = () => {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    axios.get("/athletes")
      .then(response => {
        setAthletes(response.data);
      })
      .catch(error => {
        console.error("Error fetching athletes:", error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sport</th>
          <th>Team</th>
          <th>Overall</th>
          <th>Flagged</th>
        </tr>
      </thead>
      <tbody>
        {athletes.length === 0 ? (
          <tr><td colSpan="5">No results</td></tr>
        ) : (
          athletes.map(athlete => (
            <tr key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.sport}</td>
              <td>{athlete.team}</td>
              <td>{athlete.overall}</td>
              <td>{athlete.flagged ? "Yes" : "No"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default AthletesList;
