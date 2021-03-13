export type Combine<T, U> = T & U;
export type Nullable<T> = T | null;

export type Planet = {
  name: string;
  controversial: boolean;
  yearOfDiscovery: number;
  updatedAt: string;
  potentiallyHabitable?: boolean;
  star: Star;
  distance?: Nullable<number>;
  mass?: Nullable<number>;
  radius?: Nullable<number>;
  density?: Nullable<number>;
  orbitalPeriod?: Nullable<number>;
  orbitSemiMajorAxis?: Nullable<number>;
};

export type Star = {
  name: string;
  orbitingPlanets: number;
  mass?: Nullable<number>;
  age?: Nullable<number>;
  radius?: Nullable<number>;
  temperature?: Nullable<number>;
  distance?: Nullable<number>;
  hdName?: Nullable<string>;
  hipName?: Nullable<string>;
};
