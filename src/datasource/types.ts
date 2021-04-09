import { Nullable } from "../types";

export type Error = {
  readonly status: "error";
  readonly msg: string;
};

export type PlanetJSON = {
  readonly pl_name: string;
  readonly pl_controv_flag: 0 | 1;
  readonly disc_year: number;
  readonly releasedate: string;
  readonly pl_bmassj: Nullable<number>;
  readonly pl_radj: Nullable<number>;
  readonly pl_orbsmax: Nullable<number>;
  readonly pl_orbper: Nullable<number>;
  readonly pl_dens: Nullable<number>;
  readonly rowupdate: Nullable<string>;
};

export type StarJSON = {
  readonly hostname: string;
  readonly st_teff: Nullable<number>;
  readonly st_mass: Nullable<number>;
  readonly st_rad: Nullable<number>;
  readonly st_age: Nullable<number>;
} & StellarSystem;

export type StellarSystem = {
  readonly sy_snum: number;
  readonly sy_pnum: number;
  readonly sy_dist: number;
  readonly glon: number;
  readonly glat: number;
};

export const planetColumns: readonly string[] = Array.from<keyof PlanetJSON>([
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

export const starColumns: readonly string[] = Array.from<keyof StarJSON>([
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
