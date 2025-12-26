"use server";

import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "@/lib/post";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { isInvalidText } from "@/utils/utils.client";

interface IPost {
  id?: number;
  image: File;
  title: string;
  content: string;
  createdAt?: string;
  userId: number;
}

export async function createPost(prevState, formData: FormData) {
  const image = formData.get("image") as File;
  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const userId = 1; // TODO Add userId;
  let imageUrl = "";

  const errors: string[] = [];

  if (isInvalidText(title)) {
    errors.push("Title is required.");
  }

  if (isInvalidText(content)) {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length) {
    return { errors };
  }

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed. Please try again.");
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number, userId: number) {
  await updatePostLikeStatus(postId, userId);

  revalidatePath("/feed");
}
