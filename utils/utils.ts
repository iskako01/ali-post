import fs from "node:fs";

export async function saveImageToStaticFolder(
  image: File,
  imageName: string = ""
) {
  const imageFileName = imageName || image.name;

  const stream = fs.createWriteStream(`public/images/${imageFileName}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
}

export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function isInvalidText(text: string) {
  return !text || text.trim() === "";
}
