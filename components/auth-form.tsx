"use client";

import { signup } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

export default function AuthForm({ mode }) {
  const [state, formAction] = useActionState(signup, {});

  return (
    <form className="auth-form" action={formAction}>
      <div>
        <Image
          src="/images/auth-icon.jpg"
          width={100}
          height={100}
          alt="A lock icon"
        />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="email" />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="password" />
        {state?.errors?.password && <p>{state.errors.password}</p>}
      </p>
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}

        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
