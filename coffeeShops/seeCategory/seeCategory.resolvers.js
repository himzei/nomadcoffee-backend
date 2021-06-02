import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { categories, page }) =>
      client.category.findUnique({
        take: 5,
        skip: (page - 1) * 5,
        where: {
          name: categories,
        },
      }),
  },
};
