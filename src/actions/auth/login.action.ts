import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string(),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password }, { cookies }) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return { ok: true, msg: "Logged!!" };
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError) {
        throw new Error(firebaseError.message);
      }
      throw new Error("Algo salio mal");
    }
  },
});
