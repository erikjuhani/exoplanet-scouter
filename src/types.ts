export type Combine<T, U> = T & U;
export type Nullable<T> = T | null;

export type Planet = {
  name: string;
  controversial: boolean;
  yearOfDiscovery: number;
  updatedAt: string;
  potentiallyHabitable: boolean;
  star: Star;
  distance?: number;
  mass?: number;
  radius?: number;
  density?: number;
  orbitalPeriod?: number;
  orbitSemiMajorAxis?: number;
};

export type Star = {
  name: string;
  orbitingPlanets: number;
  mass?: number;
  age?: number;
  radius?: number;
  temperature?: number;
  distance?: number;
  hdName?: string;
  hipName?: string;
};
