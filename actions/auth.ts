"use server";

import { createUser } from "@/lib/user";
import { isInvalidText } from "@/utils/utils.client";

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

  createUser(email, password);
}
