import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { handleFile, processCategory } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { loggedInUser }
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!shop) {
          return {
            ok: false,
            error: "Cannot find coffee shop",
          };
        }

        try {
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(category && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: processCategory(category),
                },
              }),
            },
          });

          if (file) {
            const photoUrl = await handleFile(file, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id,
                  },
                },
              },
            });
          }
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
