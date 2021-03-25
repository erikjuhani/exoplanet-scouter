import { PlanetJSON, StarJSON } from "../datasource";
import { Combine, Planet } from "../types";

export type ResponseTransformer = {
  transform: (data: Combine<PlanetJSON, StarJSON>) => Planet;
};

export const createResponseTransformer = (): ResponseTransformer => ({
  transform: (data) => ({
    name: data.pl_name,
    distance: data.sy_dist,
    mass: data.pl_dens,
    radius: data.pl_radj,
    density: data.pl_dens,
    orbitalPeriod: data.pl_orbper,
    orbitSemiMajorAxis: data.pl_orbsmax,
    controversial: !!data.pl_controv_flag,
    yearOfDiscovery: data.disc_year,
    // If row update field is null use the release date instead.
    updatedAt: data.rowupdate || data.releasedate,
    star: {
      name: data.hostname,
      orbitingPlanets: data.sy_pnum,
      age: data.st_age,
      distance: data.sy_dist,
      mass: data.st_mass,
      radius: data.st_rad,
      temperature: data.st_teff,
      coordinates: {
        longitude: data.glon,
        latitude: data.glat,
      },
    },
  }),
});
