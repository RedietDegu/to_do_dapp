export const byteToHex = (byteArray: any[]) => {
  if (!byteArray) {
    return;
  }
  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};