import { getMessagesFromBE, getDirectMessagesFromDB } from "@/lib/messages";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function MessagesLayout({ children }: IProps) {
  const messages = getDirectMessagesFromDB(); // await getMessagesFromBE();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
