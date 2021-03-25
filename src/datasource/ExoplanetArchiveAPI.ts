import { RESTDataSource } from "apollo-datasource-rest";
import { csvStringParse } from "../tools";
import { Combine } from "../types";
import {
  Error,
  planetColumns,
  PlanetJSON,
  starColumns,
  StarJSON,
} from "./types";

export class ExoplanetArchiveAPI extends RESTDataSource {
  // TODO: Change baseURL to be given as an optional construction parameter.
  // Use a default baseURL if paramater is not given.
  baseURL = "https://exoplanetarchive.ipac.caltech.edu/TAP/";

  private createQuery(): string {
    // TODO: Make a more generic implementation of query creation for exoplanet api.
    // TODO: Add whitespace regex somewhere, where it can exported and used in multiple locations.
    return `select ${[...planetColumns, ...starColumns].join(
      ","
    )} from ps where default_flag = 1`.replace(/\s/g, "+");
  }

  async fetchPlanets(format = "csv"): Promise<Combine<PlanetJSON, StarJSON>[]> {
    try {
      const resp = await this.get<string | Error>(
        `sync?query=${this.createQuery()}`,
        {
          format,
        }
      );

      // TODO: We might receive another type of error if the service is not functioning normally. This needs to be handled.
      //
      // For now we assume that the service functions normally in any condition so
      // if a response contains an error it will not be a string, but a json object instead.
      // In a case of string we have obtained the correct data.
      if (typeof resp === "string") {
        return csvStringParse<Combine<PlanetJSON, StarJSON>>(resp);
      }

      throw Error(resp.msg);
    } catch (err) {
      throw Error(err.message);
    }
  }
}
