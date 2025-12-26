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
