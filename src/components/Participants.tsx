import React, { useState, useEffect } from "react";
import { getParticipants } from "../services/apiFacade";
import { Modal } from "../modal/Modal";
import "./Participants.css";

export const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("ascending");

  useEffect(() => {
    getParticipants()
      .then((data) => {
        console.log("Fetched Participants:", data);
        setParticipants(data);
      })
      .catch((err) => {
        console.error("Failed to fetch participants:", err);
        setError("Failed to fetch participants");
      });
  }, []);

  const toggleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
  };

  const filterParticipantsByAge = (ageRange, participantAge) => {
    if (!ageRange) return true;
    const [minAge, maxAge] = ageRange.split("-").map(Number);
    if (maxAge) {
      return participantAge >= minAge && participantAge <= maxAge;
    }
    return participantAge >= minAge;
  };

  const filteredParticipants = participants
    .filter((participant) => {
      return (
        (genderFilter ? participant.gender === genderFilter : true) &&
        filterParticipantsByAge(ageFilter, participant.age) &&
        (clubFilter ? participant.club.includes(clubFilter) : true) &&
        (disciplineFilter ? participant.disciplin.some((d) => d.name.includes(disciplineFilter)) : true) &&
        participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "age" && sortDirection === "ascending") {
        return a.age - b.age;
      } else if (sortField === "age" && sortDirection === "descending") {
        return b.age - a.age;
      }
      const nameA = a[sortField].toUpperCase();
      const nameB = b[sortField].toUpperCase();
      if (nameA < nameB) {
        return sortDirection === "ascending" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortDirection === "ascending" ? 1 : -1;
      }
      return 0;
    });

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
      <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={() => toggleSort("name")}>Sorter Efter Navn</button>
      <button onClick={() => toggleSort("age")}>Sorter Efter Alder</button>
      <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
        <option value="">Alle Køn</option>
        <option value="Mand">Mand</option>
        <option value="Kvinde">Kvinde</option>
      </select>
      <select onChange={(e) => setAgeFilter(e.target.value)} value={ageFilter}>
        <option value="">Alle Aldrer</option>
        <option value="6-9">6-9 Børn</option>
        <option value="10-13">10-13 Junior</option>
        <option value="14-22">14-22 Unge</option>
        <option value="23-40">23-40 Voksne</option>
        <option value="41+">41+ Seinor</option>
      </select>
      <input type="text" placeholder="Klub..." onChange={(e) => setClubFilter(e.target.value)} value={clubFilter} />
      <input type="text" placeholder="Discipliner..." onChange={(e) => setDisciplineFilter(e.target.value)} value={disciplineFilter} />
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Køn</th>
            <th>Alder</th>
            <th>Klub</th>
            <th>Discipliner</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id} onClick={() => handleParticipantClick(participant)}>
              <td>{participant.name}</td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
              <td>{participant.club}</td>
              <td>{participant.disciplin.map((d) => d.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedParticipant && (
          <div>
            <div className="modal-header">{selectedParticipant.name}</div>
            <div className="modal-body">
              <p>Køn: {selectedParticipant.gender}</p>
              <p>Alder: {selectedParticipant.age}</p>
              <p>Klub: {selectedParticipant.club}</p>
              <p>Discipliner: {selectedParticipant.disciplin.map((d) => d.name).join(", ")}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
