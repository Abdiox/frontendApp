import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getResults, addResult, editResult, deleteResult, getParticipants, getDisciplins } from "../services/apiFacade";
import { Results, Participants, Disciplin } from "../services/apiFacade";
import { ResultType } from "../Enums/EnumTypes"; // Import the ResultType enum
import "./opretResults.css"; // Make sure you have this CSS file for styling

const EMPTY_RESULT: Results = {
  id: null,
  resultType: ResultType.TIME, // Default value for resultType
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
        setResults(data.map((res: Results) => ({ ...res, date: new Date(res.date) })));
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

    const resultRequest = {
      ...result,
      participantId: result.participant.id,
      disciplinId: result.disciplin.id,
    };

    action(resultRequest)
      .then(() => getResults())
      .then((data) => {
        setResults(data.map((res: Results) => ({ ...res, date: new Date(res.date) })));
        setResult(EMPTY_RESULT);
      })
      .catch((err) => {
        setError("Failed to submit result");
        console.error(err);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = event.target;
    if (id === "participant") {
      const participant = participants.find((p) => p.id === parseInt(value));
      if (participant) setResult({ ...result, participant, participantName: participant.name });
    } else if (id === "disciplin") {
      const disciplin = disciplins.find((d) => d.id === parseInt(value));
      if (disciplin) setResult({ ...result, disciplin, disciplinName: disciplin.name });
    } else if (id === "date") {
      setResult({ ...result, date: new Date(value) });
    } else if (id === "resultType") {
      setResult({ ...result, resultType: value as ResultType });
    } else {
      setResult({ ...result, [id]: value });
    }
  }

  function handleEdit(selectedResult: Results) {
    setResult({ ...selectedResult, date: new Date(selectedResult.date) });
  }

  function handleDelete(id: number) {
    deleteResult(id)
      .then(() => setResults(results.filter((res) => res.id !== id)))
      .catch((err) => {
        setError("Failed to delete result");
        console.error(err);
      });
  }

  function handleBack() {
    navigate("/results");
  }

  return (
    <div className="container">
      <h2>Resultater</h2>

      <button className="buttonBack" type="button" onClick={handleBack}>
        Tilbage
      </button>
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
          <select id="participant" value={result.participant?.id || ""} onChange={handleChange}>
            <option value="">Vælg deltager</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Disciplin:
          <select id="disciplin" value={result.disciplin?.id || ""} onChange={handleChange}>
            <option value="">Vælg disciplin</option>
            {disciplins.map((disciplin) => (
              <option key={disciplin.id} value={disciplin.id}>
                {disciplin.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Resultat Type:
          <select id="resultType" value={result.resultType} onChange={handleChange}>
            {Object.values(ResultType).map((type) => (
              <option key={type} value={type}>
                {type}
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
          <input
            id="date"
            type="date"
            value={result.date instanceof Date ? result.date.toISOString().substring(0, 10) : ""}
            onChange={handleChange}
            placeholder="Date"
          />
        </label>
        <button type="submit">Gem</button>
      </form>
    </div>
  );
}
