import { Nullable } from "../types";

export type PlanetJSON = {
  pl_name: string;
  pl_controvflag: 0 | 1;
  pl_disc: number;
  rowupdate: string;
  pl_bmassj: Nullable<number>;
  pl_radj: Nullable<number>;
  pl_orbsmax: Nullable<number>;
  pl_orbper: Nullable<number>;
  pl_dens: Nullable<number>;
  st_dist: Nullable<number>;
};

export type StarJSON = {
  pl_pnum: number;
  pl_hostname: string;
  st_glon: number;
  st_glat: number;
  hd_name: Nullable<string>;
  hip_name: Nullable<string>;
  st_teff: Nullable<number>;
  st_mass: Nullable<number>;
  st_rad: Nullable<number>;
  st_age: Nullable<number>;
};

export const planetColumns = Array.from<keyof PlanetJSON>([
  "pl_name",
  "st_dist",
  "pl_controvflag",
  "pl_disc",
  "pl_bmassj",
  "pl_orbsmax",
  "pl_orbper",
  "pl_radj",
  "pl_dens",
  "rowupdate",
]);

export const starColumns = Array.from<keyof StarJSON>([
  "pl_hostname",
  "st_teff",
  "st_mass",
  "st_rad",
  "st_age",
  "st_glon",
  "st_glat",
  "pl_pnum",
  "hd_name",
  "hip_name",
]);
