import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { getOwners } from "../services/apiFacade";

export const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOwners().then((owner) => {
      console.log("Fetched Bowling Lanes:", owner);
      setOwners(owner);
    });
  }, []);

  return (
    <div>
      <h2>Owners</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => {
            return (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
