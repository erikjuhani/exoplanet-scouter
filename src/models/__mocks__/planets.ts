import { Planet, Star } from "../../types";

export const proximaCen: Star = {
  name: "Proxima Cen",
  orbitingPlanets: 1,
  radius: 0.14,
  temperature: 3050,
  age: null,
  distance: 1.30119,
  mass: 0.12,
  coordinates: {
    latitude: -1.927165,
    longitude: 313.9399,
  },
};

export const proximaCenB: Planet = {
  name: "Proxima Cen b",
  controversial: false,
  yearOfDiscovery: 2016,
  potentiallyHabitable: true,
  updatedAt: "2016-08-25",
  star: proximaCen,
  orbitSemiMajorAxis: 0.0485,
  distance: 1.30119,
  density: null,
  mass: null,
  orbitalPeriod: 11.186,
  radius: null,
};

export const gj411: Star = {
  name: "GJ 411",
  orbitingPlanets: 1,
  radius: 0.39,
  temperature: 3601,
  distance: 2.55,
  coordinates: {
    latitude: 65.431612,
    longitude: 185.118536,
  },
};

export const gj411b: Planet = {
  name: "GJ 411 b",
  controversial: false,
  yearOfDiscovery: 2019,
  potentiallyHabitable: false,
  updatedAt: "2021-03-04",
  star: gj411,
  orbitSemiMajorAxis: 0.0789,
  distance: 2.55,
};

export const tauCet: Star = {
  name: "tau Cet",
  orbitingPlanets: 4,
  distance: 3.6,
  coordinates: {
    latitude: -73.439747,
    longitude: 173.100761,
  },
};

export const tauCetg: Planet = {
  name: "tau Cet g",
  controversial: false,
  yearOfDiscovery: 2017,
  potentiallyHabitable: false,
  updatedAt: "2017-08-17",
  star: tauCet,
  orbitSemiMajorAxis: 0.133,
  distance: 3.6,
};

export const hd219134: Star = {
  name: "HD 219134",
  orbitingPlanets: 6,
  distance: 6.53,
  coordinates: {
    latitude: -3.19852,
    longitude: 109.89845,
  },
};

export const hd219134f: Planet = {
  name: "HD 219134 f",
  controversial: true,
  yearOfDiscovery: 2015,
  potentiallyHabitable: false,
  updatedAt: "2017-03-16",
  star: hd219134,
  orbitSemiMajorAxis: 0.1463,
  distance: 6.53,
};

export const trappist1: Star = {
  name: "TRAPPIST-1",
  orbitingPlanets: 7,
  temperature: 2559,
  radius: 0.12,
  distance: 12.43,
  coordinates: {
    latitude: -56.644239,
    longitude: 69.71242,
  },
};

export const trappist1d: Planet = {
  name: "TRAPPIST-1 d",
  controversial: false,
  yearOfDiscovery: 2016,
  potentiallyHabitable: true,
  updatedAt: "2017-02-22",
  star: trappist1,
  orbitSemiMajorAxis: 0.02144,
  distance: 12.43,
};
