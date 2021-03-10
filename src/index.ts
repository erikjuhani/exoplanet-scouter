import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: {
    // 5 minute cache
    defaultMaxAge: 300,
  },
  ...createContext(),
})
  .listen()
  .then(({ url }) => console.log(`Server running at: ${url}`));
