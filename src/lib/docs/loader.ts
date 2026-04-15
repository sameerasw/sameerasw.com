import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DOCS_PATH } from './config';

export interface DocSection {
  title: string;
  order: number;
  slug: string;
  content: string;
  excerpt?: string;
  filePath: string;
  parentSlug?: string;
  items?: DocSection[];
}

export async function getDocSections(productId: string): Promise<DocSection[]> {
  const productPath = path.join(process.cwd(), DOCS_PATH, productId, 'sections');
  
  if (!fs.existsSync(productPath)) {
    return [];
  }

  const readDir = (dir: string, parentSlug?: string): DocSection[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    return entries
      .map((entry): DocSection | null => {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const indexFile = path.join(fullPath, 'index.md');
          if (fs.existsSync(indexFile)) {
            const fileContents = fs.readFileSync(indexFile, 'utf8');
            const { data, content } = matter(fileContents);
            const slug = data.slug || entry.name.replace(/^\d+-/, '');
            return {
              title: data.title || entry.name,
              order: data.order ?? 99,
              slug,
              content,
              filePath: fullPath,
              parentSlug,
              items: readDir(fullPath, slug),
            };
          }
          return null;
        }

        if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          return {
            title: data.title || entry.name,
            order: data.order ?? 99,
            slug: data.slug || entry.name.replace(/^\d+-/, '').replace('.md', ''),
            content,
            filePath: fullPath,
            parentSlug,
          };
        }

        return null;
      })
      .filter((section): section is DocSection => section !== null)
      .sort((a, b) => a.order - b.order);
  };

  return readDir(productPath);
}

export async function getDocBySlug(productId: string, slugs: string[]): Promise<DocSection | null> {
  const sections = await getDocSections(productId);
  
  const findBySlug = (items: DocSection[], targetSlugs: string[]): DocSection | null => {
    if (targetSlugs.length === 0) return null;
    const [currentSlug, ...remainingSlugs] = targetSlugs;
    const found = items.find((s) => s.slug === currentSlug);
    
    if (!found) return null;
    if (remainingSlugs.length === 0) return found;
    if (found.items) return findBySlug(found.items, remainingSlugs);
    
    return null;
  };

  return findBySlug(sections, slugs);
}

export function flattenSections(sections: DocSection[]): DocSection[] {
  const result: DocSection[] = [];
  sections.forEach((s) => {
    result.push(s);
    if (s.items) {
      result.push(...flattenSections(s.items));
    }
  });
  return result;
}
