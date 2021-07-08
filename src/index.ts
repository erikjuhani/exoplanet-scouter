import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

function main(): void {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cacheControl: {
      defaultMaxAge: 300,
    },
    ...createContext(),
  });

  server.listen().then(({ url }) => console.log(`Server running at: ${url}`));
}

main();
