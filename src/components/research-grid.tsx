'use client';

import { ResearchCard } from '@/components/research-card';
import { getResearchItems } from '@/lib/research';
import type { ResearchType } from '@/lib/research';

interface ResearchGridProps {
  type: ResearchType;
  searchQuery: string;
}

export function ResearchGrid({ type, searchQuery }: ResearchGridProps) {
  const items = getResearchItems(type, searchQuery);

  if (items.length === 0) {
    return (
      <div className="card bg-neutral-50 text-center text-sm text-muted">
        No research matched your search. Try adjusting the filters or exploring another category.
      </div>
    );
  }

  return (
    <div className="grid grid-3">
      {items.map((item) => (
        <ResearchCard key={item.slug} {...item} />
      ))}
    </div>
  );
}
