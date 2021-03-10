import { ExoplanetArchiveAPI } from "./datasource";
import { tools, Tools } from "./tools";

export type Context = {
  dataSources: {
    exoplanetArchiveAPI: ExoplanetArchiveAPI;
  };
  tools: Tools;
};

export const createContext = (): ApolloContext => ({
  dataSources: () => ({ exoplanetArchiveAPI: new ExoplanetArchiveAPI() }),
  context: {
    tools,
  },
});

type ApolloContext = {
  dataSources: () => {
    exoplanetArchiveAPI: ExoplanetArchiveAPI;
  };
  context: {
    tools: Tools;
  };
};
