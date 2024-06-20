import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { getDisciplins, getParticipants } from "../services/apiFacade";

export const Disciplins = () => {
  const [disciplin, setDisciplins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getDisciplins().then((disciplins) => {
      console.log("Fetched Disciplins:", disciplins);
      setDisciplins(disciplins);
    });
  }, []);

  return (
    <div>
      <h2>Discipliner</h2>
      <table>
        <thead>
          <tr>
            <th>Navn:</th>
            <th>Resultat Type:</th>
          </tr>
        </thead>
        <tbody>
          {disciplin.map((disciplins) => {
            return (
              <tr key={disciplins.id}>
                <td>{disciplins.name}</td>
                <td>{disciplins.resultType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
