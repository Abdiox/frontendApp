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
            <th>Resultat Type:</th>
            <th>Resultat:</th>
            <th>Dato:</th>
          </tr>
        </thead>
        <tbody>
          {result.map((results) => {
            return (
              <tr key={results.id}>
                <td>{results.resultType}</td>
                <td>{results.resultValue}</td>
                <td>{results.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
