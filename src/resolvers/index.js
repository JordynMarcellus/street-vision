exports.rootReducer = {
  Query: {
    encounters: async (root, args, context) => {
      return await context.prisma.encounters();
    },
  },
};
