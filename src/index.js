const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("../generated/prisma-client");
const { rootReducer } = require("./resolvers");

const typeDefs = `
type Query {
  encounters: [Encounter!]!
}

enum EncounterType {
  BOX_BLOCK
  RUN_RED
  SPEED_THROUGH
}

type geoLocation {
  lat: Float!
  lng: Float!
}

type Address {
  geoLocation: geoLocation!
  readable: String
}

type Encounter {
  id: String!
  type: EncounterType!
  address: Address!
  reportedOn: String!
}
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers: rootReducer,
  context: { prisma },
});
server.start(() => console.log("Server is running on localhost:4000"));
