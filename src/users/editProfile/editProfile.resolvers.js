import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../../shared/shared.utils";

const resolverFn = async (
  _,
  { name, email, location, avatarURL, githubUsername, password: newPassword },
  { loggedInUser }
) => {
  let avatar = null;
  if (avatarURL) {
    avatar = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
    console.log(avatar);
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
