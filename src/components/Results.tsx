import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getResults } from "../services/apiFacade";

export const Results = () => {
  const [result, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getResults().then((results) => {
      console.log("Fetched Results:", results);
      setResults(results);
    });
  }, []);

  return (
    <div>
      <h2>Resultater</h2>
      <table>
        <thead>
          <tr>
            <th>Deltager ID:</th>
            <th>Deltager Navn:</th>
            <th>Disciplin Navn:</th>
            <th>Resultat Type:</th>
            <th>Resultat:</th>
            <th>Dato:</th>
          </tr>
        </thead>
        <tbody>
          {result.map((results) => {
            return (
              <tr key={results.id}>
                <td>{results.participantId}</td>
                <td>{results.participantName}</td>
                <td>{results.disciplinName}</td>
                <td>{results.resultType}</td>
                <td>{(results.resultValue / 1000).toFixed(2)} sekunder</td>
                <td>{results.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
