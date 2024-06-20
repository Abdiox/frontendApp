import { EnumDataType } from "sequelize";
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
}

interface Disciplin {
  id: number | null;
  name: string;
  resultType: string;
  participants: Participants;
  results: Results;
}

interface Results {
  resultType: string;
  date: Date;
  resultValue: number;
}

let participants: Array<Participants> = [];
let disciplins: Array<Pets> = [];
let result: Array<Results> = [];

async function getParticipants(): Promise<Array<Participants>> {
  const options = makeOptions("GET");
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function getDisciplins(): Promise<Array<Disciplin>> {
  const options = makeOptions("GET");
  console.log("pets", disciplins);
  return fetch(DISCIPLIN_URL, options).then(handleHttpErrors);
}

async function getResults(): Promise<Array<Results>> {
  const options = makeOptions("GET");
  return fetch(RESULTS_URL, options).then(handleHttpErrors);
}

export { getParticipants, getDisciplins, getResults };
