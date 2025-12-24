import fs from "node:fs";
import xss from "xss";
import { formatDate } from "./format";
import { storePost } from "./posts";

interface IPost {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
}

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function addPost(post) {
  const title = post.title;
  const content = xss(post.content);
  const userId = post.userId ?? 1; // TODO Add userId;

  const imageFileName = post.image.name;
  // const extention = post.image.name.split(".").pop();
  // const imageFileName = `${post.url}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${imageFileName}`);
  const bufferedImage = await post.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  if (
    isInvalidText(post.title) ||
    isInvalidText(post.content) ||
    isInvalidText(post.createdAt) ||
    isInvalidText(post.userId) ||
    !post.image ||
    post.image.size === 0
  ) {
    return {
      message: "Invalid post data - please check your input.",
    };
  }

  const imageUrl = `/images/${imageFileName}`;

  storePost({
    imageUrl,
    title,
    content,
    userId,
  });
}
