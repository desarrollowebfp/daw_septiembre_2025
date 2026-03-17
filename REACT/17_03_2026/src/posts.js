const rawPosts = import.meta.glob("./posts\/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts = Object.entries(rawPosts).map(([path, fileText]) => {
  const slug = path.split("/").pop().replace(".md", "");

  let title = "";
  let date = "";
  let description = "";
  let content = fileText.trim();

  const parts = fileText.split("---");

  if (parts.length >= 3) {
    const metaBlock = parts[1].trim();
    content = parts.slice(2).join("---").trim();

    const lines = metaBlock.split("\n");

    lines.forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();

      if (key.trim() === "title") {
        title = value;
      }

      if (key.trim() === "date") {
        date = value;
      }

      if (key.trim() === "description") {
        description = value;
      }
    });

    return {
      slug,
      title,
      date,
      description,
      content,
    };
  }
});
