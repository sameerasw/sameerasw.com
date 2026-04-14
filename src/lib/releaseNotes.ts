import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const notesDirectory = path.join(process.cwd(), "content/release-notes");

export type AppTag = "airsync" | "essentials" | "canvas" | "tasks" | "blog";

export interface ReleaseNote {
  slug: string;
  title: string;
  description: string;
  app: AppTag;
  version: string;
  date: string;
  link: string;
  contentHtml: string;
}

export async function getAllReleaseNotes(): Promise<ReleaseNote[]> {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory).filter((f) =>
    f.endsWith(".md")
  );

  const allNotes = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Process markdown to HTML supporting raw HTML tags
      const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(content);
      
      const contentHtml = processedContent.toString();

      return {
        slug: fileName.replace(/\.md$/, ""),
        ...data,
        contentHtml,
      } as ReleaseNote;
    })
  );

  return allNotes.sort((a, b) => (a.date < b.date ? 1 : -1));
}
