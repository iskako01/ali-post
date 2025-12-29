import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default async function MessagesLayout({ children }: IProps) {
  const response = await fetch("http://localhost:8080/messages", {});
  const messages = await response.json();
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
