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
  disciplin: Disciplin;
}

interface Disciplin {
  id: number | null;
  name: string;
  disciplinType: string;
  resultType: string;
  participants: Participants;
  results: Results;
}

interface Results {
  resultType: string;
  date: Date;
  resultValue: number;
  disciplin: Disciplin;
  participant: Participants;
  participantName: string;
  disciplinName: string;
}

let participants: Array<Participants> = [];
let disciplins: Array<Pets> = [];
let result: Array<Results> = [];

//********     PARTICIPANTS ROUTES      ********//

async function getParticipants(): Promise<Array<Participants>> {
  const options = makeOptions("GET");
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function addParticipant(newParticipant: Participants): Promise<Array<Participants>> {
  const options = makeOptions("POST", newParticipant);
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function editParticipant(participant: Participants) {
  const options = makeOptions("PUT", participant);
  const response = await fetch(`${API_URL}/participants/${participant.id}`, options);
  return handleHttpErrors(response);
}

async function deleteParticipant(id: number): Promise<Array<Participants>> {
  const options = makeOptions("DELETE");
  return fetch(PARTICIPANTS_URL + "/" + id, options).then(handleHttpErrors);
}

//********     DISCIPLINS ROUTES      ********//

async function getDisciplins(): Promise<Array<Disciplin>> {
  const options = makeOptions("GET");
  console.log("pets", disciplins);
  return fetch(DISCIPLIN_URL, options).then(handleHttpErrors);
}

async function addDisciplin(newDisciplin: Disciplin): Promise<Array<Disciplin>> {
  const options = makeOptions("POST", newDisciplin);
  return fetch(DISCIPLIN_URL, options).then(handleHttpErrors);
}

async function editDisciplin(disciplin: Disciplin) {
  const options = makeOptions("PUT", disciplin);
  const response = await fetch(`${API_URL}/disciplins/${disciplin.id}`, options);
  return handleHttpErrors(response);
}

async function deleteDisciplin(id: number): Promise<Array<Disciplin>> {
  const options = makeOptions("DELETE");
  return fetch(DISCIPLIN_URL + "/" + id, options).then(handleHttpErrors);
}

//********     RESULTS ROUTES      ********//

async function getResults(): Promise<Array<Results>> {
  const options = makeOptions("GET");
  return fetch(RESULTS_URL, options).then(handleHttpErrors);
}

export { getParticipants, getDisciplins, getResults };
export { addParticipant, editParticipant, deleteParticipant, addDisciplin, editDisciplin, deleteDisciplin };
export type { Participants, Disciplin, Results };
