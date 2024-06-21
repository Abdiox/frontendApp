import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addParticipant, editParticipant, deleteParticipant, getParticipants, getDisciplins } from "../services/apiFacade";
import { Participants, Disciplin } from "../services/apiFacade";

const EMPTY_PARTICIPANT: Participants = {
  id: null,
  name: "",
  gender: "",
  age: 0,
  club: "",
  disciplin: [],
};

export default function ParticipantForm() {
  const [participant, setParticipant] = useState<Participants>(EMPTY_PARTICIPANT);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [disciplins, setDisciplins] = useState<Disciplin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getParticipants().then((data) => {
      setParticipants(data);
    });

    getDisciplins().then((data) => {
      setDisciplins(data);
    });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = participant.id ? editParticipant : addParticipant;
    const participantRequest = { ...participant, disciplineIds: participant.disciplin.map((d) => d.id!) };

    action(participantRequest)
      .then(() => {
        getParticipants().then((data) => {
          setParticipants(data);
          setParticipant(EMPTY_PARTICIPANT);
          navigate("/participants"); // Redirect to /participants after submit
        });
      })
      .catch((error) => {
        setError("Failed to submit participant");
        console.error(error);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = event.target;
    setParticipant({ ...participant, [id]: value });
  }

  function handleDisciplinChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { options } = event.target;
    const selectedDisciplins: Disciplin[] = [];
    for (const option of options) {
      if (option.selected) {
        const disciplin = disciplins.find((d) => d.id === parseInt(option.value));
        if (disciplin) {
          selectedDisciplins.push(disciplin);
        }
      }
    }
    setParticipant({ ...participant, disciplin: selectedDisciplins });
  }

  function handleEdit(selectedParticipant: Participants) {
    setParticipant(selectedParticipant);
  }

  function handleDelete(id: number) {
    deleteParticipant(id)
      .then(() => {
        setParticipants(participants.filter((p) => p.id !== id));
        navigate("/participants"); // Redirect to /participants after delete
      })
      .catch((error) => {
        setError("Failed to delete participant");
        console.error(error);
      });
  }

  function handleBack() {
    navigate("/participants");
  }

  return (
    <div>
      <h2>Deltager</h2>
      <button className="buttonBack" type="button" onClick={handleBack}>
        Tilbage
      </button>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" value={participant.name} onChange={handleChange} placeholder="Name" />
        <select id="gender" value={participant.gender} onChange={handleChange}>
          <option value="">Vælg køn</option>
          <option value="Mand">Mand</option>
          <option value="Kvinde">Kvinde</option>
        </select>
        <input type="number" id="age" value={participant.age.toString()} onChange={handleChange} placeholder="Age" />
        <input type="text" id="club" value={participant.club} onChange={handleChange} placeholder="Klub" />
        <select id="disciplin" multiple onChange={handleDisciplinChange}>
          {disciplins.map((disciplin) => (
            <option key={disciplin.id} value={disciplin.id!.toString()}>
              {disciplin.name}
            </option>
          ))}
        </select>
        <button type="submit">Opret</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Køn</th>
            <th>Alder</th>
            <th>Klub</th>
            <th>Disciplin</th>
            <th>Rediger / Slet</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
              <td>{participant.club}</td>
              <td>{participant.disciplin.map((d) => d.name).join(", ")}</td>
              <td>
                <button type="button" onClick={() => handleEdit(participant)}>
                  Rediger
                </button>
                <button type="button" onClick={() => handleDelete(participant.id!)}>
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
