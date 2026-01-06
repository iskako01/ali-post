import { ImageLoaderProps } from "next/image";

interface IImageLoaderOptions {
  width?: number;
  quality?: number;
}

export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function isInvalidText(text: string) {
  return !text || text.trim().length < 0;
}

export function imageLoader(
  config: ImageLoaderProps,
  options: IImageLoaderOptions = { width: 200 }
) {
  if (!config.src) {
    return "";
  }

  const splitedUrl = config.src.split("upload/");

  const urlStart = splitedUrl[0];
  const urlEnd = splitedUrl[1];

  const transformations = `w_${options.width},q_${
    options?.quality || config.quality
  }`;

  return `${urlStart}upload/${transformations}/${urlEnd}`;
}
