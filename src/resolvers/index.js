exports.rootReducer = {
  Query: {
    encounters: async (root, args, context) => {
      return await context.prisma.encounters();
    },
  },
  Encounter: {
    address: (root, args, context) => {
      console.log(root);
      return {
        geoLocation: {
          lat: root.lat,
          lng: root.lng,
        },
        readable: root.readable,
      };
    },
  },
  Mutation: {
    reportEncounter: async (root, { encounter }, context) => {
      const { type, address } = encounter;
      return context.prisma.createEncounter({
        type,
        ...address,
      });
    },
  },
};
