"use server";
import { signIn, signOut } from "./auth";
export const signInAction = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};
export const signOutAction = async () => {
  await signOut({ redirect: "/" });
};
