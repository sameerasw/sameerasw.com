import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocSections, getDocBySlug, flattenSections, DocSection } from '@/lib/docs/loader';
import { PRODUCTS } from '@/lib/docs/config';
import DocsLayout from '@/components/docs/DocsLayout';
import MarkdownRenderer from '@/components/docs/MarkdownRenderer';
import Link from 'next/link';
import '@/styles/docs.css';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length < 1) return { title: 'Docs' };

  const productId = slug[0];
  const sectionSlugs = slug.slice(1);
  const product = PRODUCTS[productId];

  if (!product) return { title: 'Docs' };

  if (sectionSlugs.length === 0) {
    return {
      title: `${product.name} Documentation`,
      description: product.description,
    };
  }

  const section = await getDocBySlug(productId, sectionSlugs);
  if (!section) return { title: 'Not Found' };

  return {
    title: `${section.title} - ${product.name} Docs`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.length < 1) notFound();

  const productId = slug[0];
  const sectionSlugs = slug.slice(1);
  const product = PRODUCTS[productId];

  if (!product) notFound();

  const sections = await getDocSections(productId);
  
  let currentSection: DocSection | null = null;

  if (sectionSlugs.length === 0) {
    if (sections.length > 0) {
      currentSection = sections[0];
    }
  } else {
    currentSection = await getDocBySlug(productId, sectionSlugs);
  }

  if (!currentSection) notFound();

  return (
    <DocsLayout sections={sections} productId={productId}>
      <MarkdownRenderer content={currentSection.content} />
      <DocNavigation productId={productId} sections={sections} currentSlug={currentSection.slug} />
    </DocsLayout>
  );
}

function DocNavigation({ productId, sections, currentSlug }: { productId: string, sections: DocSection[], currentSlug: string }) {
  const flat = flattenSections(sections);
  const currentIndex = flat.findIndex(s => s.slug === currentSlug);
  
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return (
    <div className="docs-nav-footer">
      {prev ? (
        <Link href={`/docs/${productId}/${prev.slug}`} className="docs-nav-button prev">
          <span className="label">Previous</span>
          <span className="title">{prev.title}</span>
        </Link>
      ) : <div />}
      
      {next ? (
        <Link href={`/docs/${productId}/${next.slug}`} className="docs-nav-button next">
          <span className="label">Next</span>
          <span className="title">{next.title}</span>
        </Link>
      ) : <div />}
    </div>
  );
}
