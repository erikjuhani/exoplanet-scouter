import { Nullable } from "../types";

export type Error = {
  status: "error";
  msg: string;
};

export type PlanetJSON = {
  pl_name: string;
  pl_controv_flag: 0 | 1;
  disc_year: number;
  releasedate: string;
  pl_bmassj: Nullable<number>;
  pl_radj: Nullable<number>;
  pl_orbsmax: Nullable<number>;
  pl_orbper: Nullable<number>;
  pl_dens: Nullable<number>;
  rowupdate: Nullable<string>;
};

export type StarJSON = {
  hostname: string;
  st_teff: Nullable<number>;
  st_mass: Nullable<number>;
  st_rad: Nullable<number>;
  st_age: Nullable<number>;
} & StellarSystem;

export type StellarSystem = {
  sy_snum: number;
  sy_pnum: number;
  sy_dist: number;
  glon: number;
  glat: number;
};

export const planetColumns = Array.from<keyof PlanetJSON>([
  "pl_name",
  "pl_controv_flag",
  "disc_year",
  "pl_bmassj",
  "pl_orbsmax",
  "pl_orbper",
  "pl_radj",
  "pl_dens",
  "rowupdate",
  "releasedate",
]);

export const starColumns = Array.from<keyof StarJSON>([
  "hostname",
  "st_teff",
  "st_mass",
  "st_rad",
  "st_age",
  "glon",
  "glat",
  "sy_pnum",
  "sy_dist",
]);
