import { IMessage } from "@/interfaces/message";

interface IProps {
  messages: IMessage[];
}
export default function Messages({ messages }: IProps) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
