import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

export default async function MarkdownRenderer({ content }: { content: string }) {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
    
  const contentHtml = processedContent.toString();

  return (
    <div 
      className="docs-md-content"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
