import { fetchMessages } from "@/lib/messages";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default async function MessagesLayout({ children }: IProps) {
  const messages = await fetchMessages();
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
