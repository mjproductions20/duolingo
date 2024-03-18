import { auth } from "@clerk/nextjs";

export const getIsAdmin = () => {
  const { userId } = auth();

  if (userId !== "user_2dlhunjHgfp31QCjDKwTa8gHDEe") return false;

  return userId === "user_2dlhunjHgfp31QCjDKwTa8gHDEe" ? true : false;
};
