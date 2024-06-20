import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addParticipant, editParticipant, deleteParticipant, getParticipants, Participants } from "../services/apiFacade";

const EMPTY_PARTICIPANT: Participants = {
  id: 0,
  name: "",
  gender: "",
  age: 0,
  club: "",
};

export default function ParticipantForm() {
  const [participant, setParticipant] = useState(EMPTY_PARTICIPANT);
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    getParticipants().then((participants) => {
      console.log("Fetched Participants:", participants);
      setParticipants(participants);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const isEditing = participant.id ? true : false;
    const action = isEditing ? editParticipant : addParticipant;
    action(participant)
      .then(() => {
        getParticipants().then((participants) => {
          setParticipants(participants);
          setParticipant(EMPTY_PARTICIPANT);
          setTimeout(() => {
            window.location.reload();
          }, 700);
        });
      })
      .catch((error) => {
        setError("Failed to submit participant");
        console.error(error);
      });
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setParticipant({ ...participant, [id]: value });
  }

  function handleEdit(participant) {
    setParticipant(participant);
  }

  function handleDelete(id) {
    deleteParticipant(id).then(() => {
      setParticipants(participants.filter((participant) => participant.id !== id));
      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  }

  function handleBack() {
    navigate("/participants");
  }

  return (
    <div>
      <h2>Participants</h2>
      <button className="buttonBack" type="button" onClick={handleBack}>
        Tilbage
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" value={participant.name} onChange={handleChange} placeholder="Name" />
        <select id="gender" value={participant.gender} onChange={handleChange}>
          <option value="Mand">Mand</option>
          <option value="Kvinde">Kvinde</option>
          <option value="Andet">Andet</option>
        </select>
        <input type="number" id="age" value={participant.age} onChange={handleChange} placeholder="Age" />
        <input type="text" id="club" value={participant.club} onChange={handleChange} placeholder="Club" />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Club</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
              <td>{participant.club}</td>
              <td>
                <button type="button" onClick={() => handleEdit(participant)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(participant.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
