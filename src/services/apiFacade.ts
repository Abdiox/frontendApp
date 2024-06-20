import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const OWNERS_URL = API_URL + "/participants";
const PETS_URL = API_URL + "/pets";

interface Participants {
  id: number;
  name: string;
  gender: string;
  age: number;
  club: string;
}

interface Pets {
  id: number;
  name: string;
  birth: string;
  type: string;
  owner: Participants;
}

let participants: Array<Participants> = [];
let pets: Array<Pets> = [];

async function getParticipants(): Promise<Array<Participants>> {
  const options = makeOptions("GET");
  return fetch(OWNERS_URL, options).then(handleHttpErrors);
}

async function getPets(): Promise<Array<Pets>> {
  const options = makeOptions("GET");
  console.log("pets", pets);
  return fetch(PETS_URL, options).then(handleHttpErrors);
}

export { getParticipants, getPets };
