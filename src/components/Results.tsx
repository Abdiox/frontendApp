import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getResults } from "../services/apiFacade";
import { Modal } from "../modal/Modal";

export const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getResults()
      .then(setResults)
      .catch((error) => {
        console.error("Failed to fetch results:", error);
        setError("Failed to load results");
      });
  }, []);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Resultater</h2>
      {error && <p>{error}</p>}
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
          {results.map((result) => (
            <tr key={result.id} className="participant-item" onClick={() => handleResultClick(result)}>
              <td>{result.participantId}</td>
              <td>{result.participantName}</td>
              <td>{result.disciplinName}</td>
              <td>{result.resultType}</td>
              <td>{(result.resultValue / 1000).toFixed(2)} sekunder</td>
              <td>{result.date}</td>
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
