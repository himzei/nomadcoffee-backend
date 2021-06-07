import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, githubUsername, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
