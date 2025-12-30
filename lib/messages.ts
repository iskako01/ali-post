import sql from "better-sqlite3";
import { cache } from "react";

const db = new sql("messages.db");

export async function addMessage(message: string) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export const getDirectMessagesFromDB = cache(
  function getDirectMessagesFromDB() {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all();
  }
);

export async function getMessagesFromBE() {
  const url = process.env.BACKEND_URL!;

  const response = await fetch(`${url}/messages`);
  const messages = await response.json();

  return messages;
}
