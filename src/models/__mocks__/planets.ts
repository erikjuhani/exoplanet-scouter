import { Planet, Star } from "../../types";

export const proximaCen: Star = {
  name: "Proxima Cen",
  orbitingPlanets: 1,
  radius: 0.14,
  temperature: 3050,
};

export const proximaCenB: Planet = {
  name: "Proxima Cen b",
  controversial: false,
  yearOfDiscovery: 2016,
  potentiallyHabitable: true,
  updatedAt: "2016-08-25",
  star: proximaCen,
  orbitSemiMajorAxis: 0.0485,
};

export const gj411: Star = {
  name: "GJ 411",
  orbitingPlanets: 1,
  radius: 0.39,
  temperature: 3601,
};

export const gj411b: Planet = {
  name: "GJ 411 b",
  controversial: false,
  yearOfDiscovery: 2019,
  potentiallyHabitable: false,
  updatedAt: "2021-03-04",
  star: gj411,
  orbitSemiMajorAxis: 0.0789,
};

export const tauCet: Star = {
  name: "tau Cet",
  orbitingPlanets: 4,
};

export const tauCetg: Planet = {
  name: "tau Cet g",
  controversial: false,
  yearOfDiscovery: 2017,
  potentiallyHabitable: false,
  updatedAt: "2017-08-17",
  star: tauCet,
  orbitSemiMajorAxis: 0.133,
};

export const hd219134: Star = {
  name: "HD 219134",
  orbitingPlanets: 6,
};

export const hd219134f: Planet = {
  name: "HD 219134 f",
  controversial: true,
  yearOfDiscovery: 2015,
  potentiallyHabitable: false,
  updatedAt: "2017-03-16",
  star: hd219134,
  orbitSemiMajorAxis: 0.1463,
};

export const trappist1: Star = {
  name: "TRAPPIST-1",
  orbitingPlanets: 7,
  temperature: 2559,
  radius: 0.12,
};

export const trappist1d: Planet = {
  name: "TRAPPIST-1 d",
  controversial: false,
  yearOfDiscovery: 2016,
  potentiallyHabitable: true,
  updatedAt: "2017-02-22",
  star: trappist1,
  orbitSemiMajorAxis: 0.02144,
};