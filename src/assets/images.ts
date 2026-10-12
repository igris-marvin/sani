const imageFiles = import.meta.glob<string>("./images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function imageAsset(filename: string): string {
  const url = imageFiles[`./images/${filename}`];
  if (!url) {
    throw new Error(`Missing image asset: ${filename}`);
  }
  return url;
}
