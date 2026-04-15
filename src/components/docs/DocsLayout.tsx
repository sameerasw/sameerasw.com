import { ReactNode } from 'react';
import DocsSidebar from './DocsSidebar';
import { DocSection } from '@/lib/docs/loader';
import { PRODUCTS } from '@/lib/docs/config';
import '@/styles/docs.css';
import MadeByChip from '../MadeByChip';

interface DocsLayoutProps {
  children: ReactNode;
  sections: DocSection[];
  productId: string;
}

export default function DocsLayout({ children, sections, productId }: DocsLayoutProps) {
  const product = PRODUCTS[productId];

  return (
    <div className="docs-wrapper">
      <div className="docs-back-header">
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
           <a href={`/${productId}`} className="docs-back-button-nice" aria-label="Go Back">
             <span className="material-symbols-rounded">arrow_back</span>
           </a>
           {product && (
             <div className="docs-brand-header" style={{ color: product.accentColor }}>
               <img 
                 src={`/assets/img/project-logos/${productId}-logo.svg`} 
                 alt={`${product.name} Logo`} 
                 className="docs-brand-logo"
               />
               <span>{product.name}</span>
             </div>
           )}
         </div>
      </div>

      <div className="docs-mobile-nav-wrap">
        <details className="docs-mobile-nav-details">
          <summary className="docs-mobile-nav-summary">Table of Contents</summary>
          <div style={{ paddingTop: '1rem' }}>
            <DocsSidebar sections={sections} productId={productId} />
          </div>
        </details>
      </div>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <DocsSidebar sections={sections} productId={productId} />
        </aside>
        
        <main className="docs-main">
          {children}
          <MadeByChip />
        </main>
      </div>
    </div>
  );
}
