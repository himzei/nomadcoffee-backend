import fs from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { name, email, location, avatarURL, githubUsername, password: newPassword },
  { loggedInUser }
) => {
  let avatar = null;
  if (avatarURL) {
    const { filename, createReadStream } = await avatarURL;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatar = `http://localhost:4000/static/${newFilename}`;
  }
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      name,
      email,
      location,
      githubUsername,
      ...(avatar && { avatarURL: avatar }),
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
