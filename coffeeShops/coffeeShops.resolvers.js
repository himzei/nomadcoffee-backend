import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Category: {
    totalShops: ({ id }) => {
      console.log(id);
      return client.category.count({
        where: {
          id,
        },
      });
    },
  },
};
