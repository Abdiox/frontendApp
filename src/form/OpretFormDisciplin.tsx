import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDisciplin, editDisciplin, deleteDisciplin, getDisciplins, Disciplin } from "../services/apiFacade";
import { DisciplineType, ResultType } from "../Enums/EnumTypes"; // Importer enum DisciplineType

const EMPTY_DISCIPLIN: Disciplin = {
  id: 0,
  name: "",
  disciplineType: DisciplineType.LØB_100_METER, // Default value for disciplineType
  resultType: ResultType.TIME, // Default value for resultType
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = event.target;
    setDisciplin({ ...disciplin, [id]: value });
  }

  function handleEdit(disciplin: Disciplin) {
    setDisciplin(disciplin);
  }

  function handleDelete(id: number) {
    deleteDisciplin(id).then(() => {
      setDisciplins(disciplins.filter((disciplin) => disciplin.id !== id));
      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  }

  function handleBack() {
    navigate("/disciplins");
  }

  return (
    <div>
      <h2>Opret / Rediger Disciplin</h2>
      <button className="buttonBack" type="button" onClick={handleBack}>
        Tilbage
      </button>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Disciplin Type</th>
            <th>Resultat Type</th>
            <th>Rediger</th>
            <th>Slet</th>
          </tr>
        </thead>
        <tbody>
          {disciplins.map((disciplin) => (
            <tr key={disciplin.id}>
              <td>{disciplin.name}</td>
              <td>{disciplin.disciplineType}</td>
              <td>{disciplin.resultType}</td>
              <td>
                <button onClick={() => handleEdit(disciplin)}>Rediger</button>
              </td>
              <td>
                <button onClick={() => handleDelete(disciplin.id)}>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Navn</label>
        <input type="text" id="name" placeholder="Navn" value={disciplin.name} onChange={handleChange} />
        <label htmlFor="disciplineType">Disciplin Type</label>
        <select id="disciplineType" value={disciplin.disciplineType} onChange={handleChange}>
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
      {error && <p className="error">{error}</p>}
    </div>
  );
}
