import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const OWNERS_URL = API_URL + "/owners";
const PETS_URL = API_URL + "/pets";

interface Owners {
  id: number;
  name: string;
  age: number;
}

interface Pets {
  id: number;
  name: string;
  birth: string;
  type: string;
  owner: Owners;
}

let owners: Array<Owners> = [];
let pets: Array<Pets> = [];

async function getOwners(): Promise<Array<Owners>> {
  const options = makeOptions("GET");
  return fetch(OWNERS_URL, options).then(handleHttpErrors);
}

async function getPets(): Promise<Array<Pets>> {
  const options = makeOptions("GET");
  console.log("pets", pets);
  return fetch(PETS_URL, options).then(handleHttpErrors);
}

export { getOwners, getPets };
