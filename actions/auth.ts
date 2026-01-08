"use server";

import { createAuthSession } from "@/lib/auth";
import { createUser } from "@/lib/user";
import { isInvalidText } from "@/utils/utils.client";
import { hashUserPassword } from "@/utils/utils.server";
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
