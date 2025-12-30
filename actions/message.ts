"use server";

import { addMessage } from "@/lib/messages";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMessage(formData: FormData) {
  const message = formData.get("message") || "";

  await addMessage(message as string);

  revalidatePath("/messages");
  redirect("/messages");
}
