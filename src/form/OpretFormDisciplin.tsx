import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDisciplin, editDisciplin, deleteDisciplin, getDisciplins, Disciplin } from "../services/apiFacade";
import { DisciplineType, ResultType } from "../Enums/EnumTypes"; // Importer enum DisciplineType

const EMPTY_DISCIPLIN: Disciplin = {
  id: 0,
  name: "",
  disciplinType: "",
  resultType: "",
};

export default function DisciplinForm() {
  const [disciplin, setDisciplin] = useState(EMPTY_DISCIPLIN);
  const [disciplins, setDisciplins] = useState<Disciplin[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDisciplins().then((disciplins) => {
      console.log("Fetched Disciplins:", disciplins);
      setDisciplins(disciplins);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const isEditing = disciplin.id ? true : false;
    const action = isEditing ? editDisciplin : addDisciplin;
    action(disciplin)
      .then(() => {
        getDisciplins().then((disciplins) => {
          setDisciplins(disciplins);
          setDisciplin(EMPTY_DISCIPLIN);
          setTimeout(() => {
            window.location.reload();
          }, 700);
        });
      })
      .catch((error) => {
        setError("Failed to submit disciplin");
        console.error(error);
      });
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setDisciplin({ ...disciplin, [id]: value });
  }

  function handleEdit(disciplin) {
    setDisciplin(disciplin);
  }

  function handleDelete(id) {
    deleteDisciplin(id).then(() => {
      setDisciplins(disciplins.filter((disciplin) => disciplin.id !== id));
      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  }

  return (
    <div>
      <h2>Opret / Rediger Disciplin</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Navn" value={disciplin.name} onChange={handleChange} />
        <select id="disciplinType" value={disciplin.disciplinType} onChange={handleChange}>
          {Object.values(DisciplineType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select id="resultType" value={disciplin.resultType} onChange={handleChange}>
          {Object.values(ResultType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit">Gem</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Disciplin Type:</th>
            <th></th>
            <th>Resultat Type:</th>
            <th>Rediger:</th>
            <th>Slet:</th>
          </tr>
        </thead>
        <tbody>
          {disciplins.map((disciplin) => {
            return (
              <tr key={disciplin.id}>
                <td>{disciplin.name}</td>
                <td>{disciplin.disciplinType}</td>
                <td>{disciplin.resultType}</td>
                <td>
                  <button onClick={() => handleEdit(disciplin)}>Rediger</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(disciplin.id)}>Slet</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
