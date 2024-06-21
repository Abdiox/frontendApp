import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getResults } from "../services/apiFacade";
import { Modal } from "../modal/Modal";

export const Results = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterAgeGroup, setFilterAgeGroup] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // For sorting order
  const navigate = useNavigate();

  useEffect(() => {
    getResults()
      .then((data) => {
        setResults(data);
        setFilteredResults(data);
      })
      .catch((error) => {
        console.error("Failed to fetch results:", error);
        setError("Failed to load results");
      });
  }, []);

  useEffect(() => {
    filterAndSortResults();
  }, [filterGender, filterAgeGroup, sortOrder, results]);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const filterAndSortResults = () => {
    let filtered = [...results];

    if (filterGender) {
      filtered = filtered.filter((result) => result.participantGender === filterGender);
    }

    if (filterAgeGroup) {
      filtered = filtered.filter((result) => {
        const age = result.participantAge;
        if (filterAgeGroup === "under18") return age < 18;
        if (filterAgeGroup === "18to25") return age >= 18 && age <= 25;
        if (filterAgeGroup === "over25") return age > 25;
        return true;
      });
    }

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.resultValue - b.resultValue;
      } else {
        return b.resultValue - a.resultValue;
      }
    });

    setFilteredResults(filtered);
  };

  return (
    <div>
      <h2>Resultater</h2>
      {error && <p>{error}</p>}

      <div>
        <label>
          Køn:
          <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
            <option value="">Alle</option>
            <option value="Mand">Mand</option>
            <option value="Kvinde">Kvinde</option>
          </select>
        </label>
        <label>
          Aldersgruppe:
          <select value={filterAgeGroup} onChange={(e) => setFilterAgeGroup(e.target.value)}>
            <option value="">Alle</option>
            <option value="under18">Under 18</option>
            <option value="18to25">18-25</option>
            <option value="over25">Over 25</option>
          </select>
        </label>
        <label>
          Sorter efter Resultat:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Bedste først</option>
            <option value="desc">Dårligste først</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Deltager ID:</th>
            <th>Deltager Navn:</th>
            <th>Disciplin Navn:</th>
            <th>Resultat Type:</th>
            <th>Resultat:</th>
            <th>Dato:</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result) => (
            <tr key={result.id} className="participant-item" onClick={() => handleResultClick(result)}>
              <td>{result.participantId}</td>
              <td>{result.participantName}</td>
              <td>{result.disciplinName}</td>
              <td>{result.resultType}</td>
              <td>{(result.resultValue / 1000).toFixed(2)} sekunder</td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && selectedResult && (
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <div>
            <div className="modal-header">Deltager Navn: {selectedResult.participantName}</div>
            <div className="modal-body">
              <div>Deltager ID: {selectedResult.participantId}</div>
              <div>Disciplin Navn: {selectedResult.disciplinName}</div>
              <div>Resultat Type: {selectedResult.resultType}</div>
              <div>{(selectedResult.resultValue / 1000).toFixed(2)} sekunder</div>
              <div>Dato: {selectedResult.date}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
