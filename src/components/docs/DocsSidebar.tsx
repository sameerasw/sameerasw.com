'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocSection } from '@/lib/docs/loader';

interface DocsSidebarProps {
  sections: DocSection[];
  productId: string;
}

export default function DocsSidebar({ sections, productId }: DocsSidebarProps) {
  const pathname = usePathname();

  const renderItems = (items: DocSection[], prefix = '') => {
    return items.map((section) => {
      const fullSlug = prefix ? `${prefix}/${section.slug}` : section.slug;
      const href = `/docs/${productId}/${fullSlug}`;
      const isActive = pathname === href;

      return (
        <div key={section.slug}>
          <Link
            href={href}
            className={`docs-sidebar-link ${isActive ? 'active' : ''} ${prefix ? 'docs-sidebar-sublink' : ''}`}
          >
            {section.title}
          </Link>
          {section.items && section.items.length > 0 && (
            <div>
              {renderItems(section.items, fullSlug)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="docs-sidebar-section">Documentation</div>
      {renderItems(sections)}
    </>
  );
}
