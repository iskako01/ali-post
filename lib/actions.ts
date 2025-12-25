import xss from "xss";
import { storePost } from "./posts";
import { saveImageToStaticFolder } from "@/utils/utils";

interface IPost {
  id?: number;
  image: File;
  title: string;
  content: string;
  createdAt?: string;
  userId: number;
}

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function addPost(post: IPost) {
  const title = post.title;
  const content = xss(post.content);
  const userId = post.userId ?? 1; // TODO Add userId;
  const errors: string[] = [];

  const imageFileName = post.image.name;
  // const extention = post.image.name.split(".").pop();
  // const imageFileName = `${post.url}.${extention}`;

  await saveImageToStaticFolder(post.image);

  if (isInvalidText(post.title)) {
    errors.push("Title is required.");
  }

  if (isInvalidText(post.content)) {
    errors.push("Content is required.");
  }

  if (!post.image || post.image.size === 0) {
    errors.push("Image is required.");
  }

  const imageUrl = `/images/${imageFileName}`;
  console.log({
    imageUrl,
    title,
    content,
    userId,
  });

  if (errors.length) {
    return { errors };
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId,
  });
}
