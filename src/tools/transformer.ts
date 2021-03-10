import { PlanetJSON, StarJSON } from "../datasource";
import { Combine, Planet } from "../types";

export type ResponseTransformer = {
  transform: (data: Combine<PlanetJSON, StarJSON>) => Planet;
};

export const createResponseTransformer = (): ResponseTransformer => ({
  transform: (data) => ({
    name: data.pl_name,
    distance: data.st_dist,
    mass: data.pl_dens,
    radius: data.pl_radj,
    density: data.pl_dens,
    orbitalPeriod: data.pl_orbper,
    orbitSemiMajorAxis: data.pl_orbsmax,
    controversial: !!data.pl_controvflag,
    yearOfDiscovery: data.pl_disc,
    updatedAt: data.rowupdate,
    potentiallyHabitable: false,
    star: {
      name: data.pl_hostname,
      hdName: data.hd_name,
      hipName: data.hip_name,
      orbitingPlanets: data.pl_pnum,
      age: data.st_age,
      distance: data.st_dist,
      mass: data.st_mass,
      radius: data.st_rad,
      temperature: data.st_teff,
    },
  }),
});
