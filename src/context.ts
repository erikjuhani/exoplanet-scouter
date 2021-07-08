import { ExoplanetArchiveAPI } from "./datasource";

export interface Context {
  dataSources: {
    exoplanetArchiveAPI: ExoplanetArchiveAPI;
  };
}

interface DataSources {
  exoplanetArchiveAPI: ExoplanetArchiveAPI;
}

interface ApolloContext {
  dataSources: () => {
    exoplanetArchiveAPI: ExoplanetArchiveAPI;
  };
}

export const createContext = (): ApolloContext => ({
  dataSources: (): DataSources => ({
    exoplanetArchiveAPI: new ExoplanetArchiveAPI(),
  }),
});
