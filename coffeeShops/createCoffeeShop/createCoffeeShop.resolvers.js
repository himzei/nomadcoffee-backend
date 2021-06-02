import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, photos },
        { loggedInUser }
      ) => {
        let photosObj = [];
        if (photosObj.length > 0) {
          photosObj = photos.map((photo) => ({
            where: { photo },
            create: { photo },
          }));
        }

        return client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            ...(photosObj.length > 0 && {
              photos: {
                connectOrCreate: photosObj,
              },
            }),
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            categories: {
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
      }
    ),
  },
};
