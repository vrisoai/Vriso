import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Pure server component — no 'use client' needed.
 * Hover styles handled via .breadcrumb-link in components.css.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        width: '100%',
        padding: '0.75rem clamp(1.5rem, 5vw, 4rem)',
        borderBottom: '1px solid rgba(38,38,38,0.7)',
        background: 'rgba(18,18,18,0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 'var(--nav-h, 64px)',
        zIndex: 40,
      }}
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: '0 auto',
          padding: 0,
          maxWidth: '72rem',
        }}
      >
        {/* Home — always first */}
        <li>
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Separator */}
              <span aria-hidden="true" className="breadcrumb-sep">/</span>

              {isLast || !item.href ? (
                <span aria-current="page" className="breadcrumb-current" title={item.label}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
