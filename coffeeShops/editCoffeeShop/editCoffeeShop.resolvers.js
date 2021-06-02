import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const ok = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { categories: { select: { name: true } } },
        });
        console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "Shop not found",
          };
        }
        const updateddShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: ok.categories,
              connectOrCreate: {
                where: {
                  name: categories,
                },
                create: {
                  name: categories,
                },
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
