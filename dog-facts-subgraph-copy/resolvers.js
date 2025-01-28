const resolvers = {
  Query: {
    getBookByQuery: async (_, { query }, { dataSources }) => {
      const response = await dataSources.booksAPI.getBookByQuery(query);

      return response;
    },
    getBookByTitle: async (_, { title }, { dataSources }) => {
      const response = await dataSources.booksAPI.getBookByTitle(title);

      return response;
    },
    getBookByAuthor: async (_, { author }, { dataSources }) => {
      const response = await dataSources.booksAPI.getBookByAuthor(author);

      const authors = response.docs.map((doc) => ({
        name: doc.name,
        birthDate: doc.birth_date || null,
        deathDate: doc.death_date || null,
        topSubjects: doc.top_subjects || [],
        topWork: doc.top_work || null,
      }));

      return authors;
    },
  },
};

module.exports = resolvers;
