import client from "../client";
import bcrypt from "bcrypt";

export default {
  Query: {},
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, githubUsername, password }
    ) => {
      const existing = await client.user.findFirst({
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
      const uglyPassword = await bcrypt.hash(password, 10);

      return client.user.create({
        data: {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: uglyPassword,
        },
      });
    },
  },
};
