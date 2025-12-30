import Messages from "@/components/messages";
import { getMessagesFromBE, getDirectMessagesFromDB } from "@/lib/messages";

// export const revalidate = 5;
// export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = getDirectMessagesFromDB(); // await getMessagesFromBE();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
