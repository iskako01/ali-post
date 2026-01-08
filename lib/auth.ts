import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./traningdb";
import { cookies } from "next/headers";
import { error } from "console";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  await createSessionCookie(session.id);
}

export async function createSessionCookie(sessionId: string) {
  const sessionCookie = lucia.createSessionCookie(sessionId);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function createBlankSessionCookie() {
  const blankSessionCookie = lucia.createBlankSessionCookie();

  (await cookies()).set(
    blankSessionCookie.name,
    blankSessionCookie.value,
    blankSessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      email: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      email: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      await createSessionCookie(result.session.id);
    }

    if (!result.session) {
      await createBlankSessionCookie();
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);
  await createBlankSessionCookie();
}
