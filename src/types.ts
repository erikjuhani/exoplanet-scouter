export type Combine<T, U> = T & U;
export type Nullable<T> = T | null;

export type Planet = {
  readonly name: string;
  readonly controversial: boolean;
  readonly yearOfDiscovery: number;
  readonly updatedAt: string;
  readonly potentiallyHabitable?: boolean;
  readonly star: Star;
  readonly distance?: Nullable<number>;
  readonly mass?: Nullable<number>;
  readonly radius?: Nullable<number>;
  readonly density?: Nullable<number>;
  readonly orbitalPeriod?: Nullable<number>;
  readonly orbitSemiMajorAxis?: Nullable<number>;
};

export type LatLng = {
  readonly longitude: number;
  readonly latitude: number;
};

export type XYZ = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type Star = {
  readonly name: string;
  readonly orbitingPlanets: number;
  readonly coordinates: LatLng | XYZ;
  readonly mass?: Nullable<number>;
  readonly age?: Nullable<number>;
  readonly radius?: Nullable<number>;
  readonly temperature?: Nullable<number>;
  readonly distance?: Nullable<number>;
  readonly hdName?: Nullable<string>;
  readonly hipName?: Nullable<string>;
};
