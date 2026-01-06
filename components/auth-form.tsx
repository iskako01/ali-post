"use client";

import { signup } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

export default function AuthForm() {
  const [state, formAction] = useActionState(signup, {});
  console.log({ state });

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
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
