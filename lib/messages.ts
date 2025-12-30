import sql from "better-sqlite3";

const db = new sql("messages.db");

export async function addMessage(message: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export async function getMessages() {
  console.log("Fetching messages from db");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return db.prepare("SELECT * FROM messages").all();
}

export async function fetchMessages() {
  const url = process.env.BACKEND_URL!;

  const response = await fetch(`${url}/messages`);
  const messages = await response.json();

  return messages;
}
