import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const PARTICIPANTS_URL = API_URL + "/participants";
const DISCIPLIN_URL = API_URL + "/disciplins";
const RESULTS_URL = API_URL + "/results";

interface Participants {
  id: number | null;
  name: string;
  gender: string;
  age: number;
  club: string;
  disciplin: Disciplin[];
}

interface Disciplin {
  id: number | null;
  name: string;
  disciplinType: string;
  resultType: string;
  participants: Participants[];
  results: Results[];
}

interface Results {
  id: number | null;
  resultType: string;
  date: Date;
  resultValue: number;
  disciplin: Disciplin;
  participant: Participants;
  participantName: string;
  disciplinName: string;
}

async function getParticipants(): Promise<Participants[]> {
  const options = makeOptions("GET");
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function addParticipant(newParticipant: Omit<Participants, "disciplin"> & { disciplineIds: number[] }): Promise<Participants> {
  const options = makeOptions("POST", newParticipant);
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function editParticipant(participant: Omit<Participants, "disciplin"> & { disciplineIds: number[] }): Promise<Participants> {
  const options = makeOptions("PUT", participant);
  const response = await fetch(`${PARTICIPANTS_URL}/${participant.id}`, options);
  return handleHttpErrors(response);
}

async function deleteParticipant(id: number): Promise<void> {
  const options = makeOptions("DELETE");
  return fetch(`${PARTICIPANTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function getDisciplins(): Promise<Disciplin[]> {
  const options = makeOptions("GET");
  return fetch(DISCIPLIN_URL, options).then(handleHttpErrors);
}

async function addDisciplin(newDisciplin: Disciplin): Promise<Disciplin> {
  const options = makeOptions("POST", newDisciplin);
  return fetch(DISCIPLIN_URL, options).then(handleHttpErrors);
}

async function editDisciplin(disciplin: Disciplin): Promise<Disciplin> {
  const options = makeOptions("PUT", disciplin);
  const response = await fetch(`${DISCIPLIN_URL}/${disciplin.id}`, options);
  return handleHttpErrors(response);
}

async function deleteDisciplin(id: number): Promise<void> {
  const options = makeOptions("DELETE");
  return fetch(`${DISCIPLIN_URL}/${id}`, options).then(handleHttpErrors);
}

async function getResults(): Promise<Results[]> {
  const options = makeOptions("GET");
  return fetch(RESULTS_URL, options).then(handleHttpErrors);
}

async function addResult(newResult: Results): Promise<Results> {
  const options = makeOptions("POST", newResult);
  return fetch(RESULTS_URL, options).then(handleHttpErrors);
}

async function editResult(result: Results): Promise<Results> {
  const options = makeOptions("PUT", result);
  const response = await fetch(`${RESULTS_URL}/${result.id}`, options);
  return handleHttpErrors(response);
}

async function deleteResult(id: number): Promise<void> {
  const options = makeOptions("DELETE");
  return fetch(`${RESULTS_URL}/${id}`, options).then(handleHttpErrors);
}

export { getParticipants, getDisciplins, getResults };
export { addParticipant, editParticipant, deleteParticipant, addDisciplin, editDisciplin, deleteDisciplin, addResult, editResult, deleteResult };
export type { Participants, Disciplin, Results };
