import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { handleFile, processCategory } from "../coffeeShop.utils";
import { uploadToS3 } from "../../../shared/shared.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, photos },
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

          if (photos) {
            const photoUrl = await uploadToS3(
              photos,
              loggedInUser.id,
              "photos"
            );
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
