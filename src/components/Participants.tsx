import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { getParticipants } from "../services/apiFacade";

export const Participants = () => {
  const [participant, setParticipants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getParticipants().then((participants) => {
      console.log("Fetched Participants:", participants);
      setParticipants(participants);
    });
  }, []);

  return (
    <div>
      <h2>Owners</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Club</th>
          </tr>
        </thead>
        <tbody>
          {participant.map((participants) => {
            return (
              <tr key={participants.id}>
                <td>{participants.name}</td>
                <td>{participants.gender}</td>
                <td>{participants.age}</td>
                <td>{participants.club}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
