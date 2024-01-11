"use client";
import { useSession } from "next-auth/react";

const getUser = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return user;
};
export default getUser;
