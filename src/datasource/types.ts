export type PlanetJSON = {
  pl_name: string;
  pl_controvflag: 0 | 1;
  pl_disc: number;
  rowupdate: string;
  pl_bmassj?: number;
  pl_radj?: number;
  pl_orbsmax?: number;
  pl_orbper?: number;
  pl_dens?: number;
  st_dist?: number;
};

export type StarJSON = {
  pl_pnum: number;
  pl_hostname: string;
  hd_name?: string;
  hip_name?: string;
  st_teff?: number;
  st_mass?: number;
  st_rad?: number;
  st_age?: number;
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
  "pl_pnum",
  "hd_name",
  "hip_name",
]);
