export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function isInvalidText(text: string) {
  return !text || text.trim() === "";
}
