import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { handleFile, processCategory } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, file },
        { loggedInUser }
      ) => {
        try {
          const shop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              categories: {
                connectOrCreate: processCategory(category),
              },
            },
          });

          if (file) {
            const photoUrl = await handleFile(file, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id: shop.id,
                  },
                },
              },
            });
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
};
