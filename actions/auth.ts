"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { createUser, getUserByEmail } from "@/lib/user";
import { isInvalidText } from "@/utils/utils.client";
import { hashUserPassword, verifyPassword } from "@/utils/utils.server";
import { redirect } from "next/navigation";

export async function signup(prevState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors = {
    email: "",
    password: "",
  };

  if (isInvalidText(email) && !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (isInvalidText(password)) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (errors.email || errors.password) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const userId = createUser(email, hashedPassword);

    await createAuthSession(userId);

    redirect("/training");
  } catch (error: unknown) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account for the chosen email already exists.",
        },
      };
    }

    throw error;
  }
}

export async function login(prevState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors = {
    email: "",
    password: "",
  };

  if (isInvalidText(email) && !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (isInvalidText(password)) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (errors.email || errors.password) {
    return { errors };
  }

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode: string, prevState, formData: FormData) {
  if (mode === "login") {
    return login(prevState, formData);
  }

  if (mode === "signup") {
    return signup(prevState, formData);
  }
}

export async function logout() {
  await destroySession();

  redirect("/");
}
