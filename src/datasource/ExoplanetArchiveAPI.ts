import { RESTDataSource } from "apollo-datasource-rest";
import { Combine } from "../types";
import { planetColumns, PlanetJSON, starColumns, StarJSON } from "./types";

export class ExoplanetArchiveAPI extends RESTDataSource {
  baseURL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/";

  async fetchPlanets(): Promise<Combine<PlanetJSON, StarJSON>[]> {
    try {
      const resp = await this.get<string>("nph-nstedAPI", {
        table: "exoplanets",
        select: [...planetColumns, ...starColumns].join(","),
        format: "json",
      });

      // Handle error.
      if (resp.startsWith("ERROR")) {
        // Error string is split into four cells.
        // Error, Error Type, Error Message, and empty space.
        const splitStr = resp.replace("<br>", "").split("\n");
        // We want to throw the message so we take index 2.
        throw Error(splitStr[2]);
      }
      return JSON.parse(resp);
    } catch (err) {
      throw Error(err.message);
    }
  }
}
