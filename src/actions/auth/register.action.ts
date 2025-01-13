import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { boolean, z } from "astro:schema";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    console.log("🚀 ~ handler: ~ { name, email, password, remember_me }:", {
      name,
      email,
      password,
      remember_me,
    });
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    // Create a user
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      // Update name (displayname)
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      });

      // Verify email
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVirified=true`,
      });

      return { ok: true, msg: "Usuario creado" };

      return user;
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El correo ya esta en uso");
      }
      throw new Error("Algo salio mal");
    }
  },
});
