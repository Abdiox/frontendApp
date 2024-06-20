import { useState, useEffect } from "react";
import { getParticipants } from "../services/apiFacade";
import { Modal } from "../modal/Modal";

import "./Participants.css";

export const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getParticipants()
      .then((participants) => {
        console.log("Fetched Participants:", participants);
        setParticipants(participants);
      })
      .catch((err) => {
        console.error("Failed to fetch participants:", err);
        setError("Failed to fetch participants");
      });
  }, []);

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Deltager</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr className="participant-item">
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Club</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id} className="participant-item" onClick={() => handleParticipantClick(participant)}>
              <td>{participant.name}</td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
              <td>{participant.club}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedParticipant && (
          <div>
            <div className="modal-header">Navn: {selectedParticipant.name}</div>
            <div className="modal-body">
              <div>Køn: {selectedParticipant.gender}</div>
              <div>Alder: {selectedParticipant.age}</div>
              <div>Klub: {selectedParticipant.club}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
