import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getResults, addResult, editResult, deleteResult, getParticipants, getDisciplins } from "../services/apiFacade";
import { Results, Participants, Disciplin } from "../services/apiFacade";
import "./opretResults.css"; // Make sure you have this CSS file for styling

const EMPTY_RESULT: Results = {
  id: null,
  resultType: "",
  date: new Date(),
  resultValue: 0,
  disciplin: {} as Disciplin,
  participant: {} as Participants,
  participantName: "",
  disciplinName: "",
};

export default function ResultForm() {
  const [result, setResult] = useState<Results>(EMPTY_RESULT);
  const [results, setResults] = useState<Results[]>([]);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [disciplins, setDisciplins] = useState<Disciplin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getResults()
      .then((data) => {
        console.log("Fetched Results:", data);
        setResults(data);
      })
      .catch((err) => {
        setError("Failed to fetch results");
        console.error(err);
      });

    getParticipants()
      .then((data) => {
        console.log("Fetched Participants:", data);
        setParticipants(data);
      })
      .catch((err) => {
        setError("Failed to fetch participants");
        console.error(err);
      });

    getDisciplins()
      .then((data) => {
        console.log("Fetched Disciplins:", data);
        setDisciplins(data);
      })
      .catch((err) => {
        setError("Failed to fetch disciplins");
        console.error(err);
      });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = result.id ? editResult : addResult;

    action(result)
      .then(() => getResults())
      .then((data) => {
        setResults(data);
        setResult(EMPTY_RESULT);
      })
      .catch((err) => {
        setError("Failed to submit result");
        console.error(err);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = event.target;
    setResult({ ...result, [id]: id === "participant" || id === "disciplin" ? value : value });
  }

  function handleEdit(selectedResult: Results) {
    setResult(selectedResult);
  }

  function handleDelete(id: number) {
    deleteResult(id)
      .then(() => setResults(results.filter((res) => res.id !== id)))
      .catch((err) => {
        setError("Failed to delete result");
        console.error(err);
      });
  }

  return (
    <div className="container">
      <h2>Resultater</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Deltager:</th>
            <th>Disciplin:</th>
            <th>Resultat:</th>
            <th>Dato:</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res) => (
            <tr key={res.id}>
              <td>{res.participantName}</td>
              <td>{res.disciplinName}</td>
              <td>{res.resultValue}</td>
              <td>{new Date(res.date).toLocaleDateString()}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(res)}>
                  Rediger
                </button>
                <button className="delete" onClick={() => handleDelete(res.id!)}>
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <label>
          Deltager:
          <select id="participant" value={result.participant.name || ""} onChange={handleChange}>
            <option value="">Vælg deltager</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.name}>
                {participant.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Disciplin:
          <select id="disciplin" value={result.disciplin.name || ""} onChange={handleChange}>
            <option value="">Vælg disciplin</option>
            {disciplins.map((disciplin) => (
              <option key={disciplin.id} value={disciplin.name}>
                {disciplin.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Resultat:
          <input id="resultValue" type="number" value={result.resultValue} onChange={handleChange} placeholder="Result Value" />
        </label>
        <label>
          Dato:
          <input id="date" type="date" value={result.date.toISOString().substring(0, 10)} onChange={handleChange} placeholder="Date" />
        </label>
        <button type="submit">Gem</button>
      </form>
    </div>
  );
}
