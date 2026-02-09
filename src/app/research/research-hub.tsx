'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/components/icons';
import { ResearchGrid } from '@/components/research-grid';
import type { ResearchType } from '@/lib/research';

const categories: Array<{ label: string; value: ResearchType; blurb: string }> = [
  {
    value: 'paper',
    label: 'Research Papers',
    blurb: 'Deep dives, frameworks, and executive-ready analysis.',
  },
  {
    value: 'insight',
    label: 'Insights & Analysis',
    blurb: 'Strategic commentary for security leaders.',
  },
  {
    value: 'tool',
    label: 'Tools & Frameworks',
    blurb: 'Hands-on code, playbooks, and assessment tooling.',
  },
];

export default function ResearchHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ResearchType>('paper');
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && categories.some((category) => category.value === tabParam)) {
      setActiveTab(tabParam as ResearchType);
    }
  }, [searchParams]);

  const activeBlurb = useMemo(
    () => categories.find((category) => category.value === activeTab)?.blurb ?? '',
    [activeTab],
  );

  return (
    <div className="bg-neutral-50">
      <div className="container pb-20 pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="security-tag mb-4">Knowledge Centre</span>
          <h1>Research &amp; Insights</h1>
          <p className="lead mb-0">
            AI security research, MCP frameworks, and vulnerability analysis designed for enterprise leaders and builders.
          </p>

          <div className="relative mx-auto mt-12 max-w-xl">
            <SearchIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <Input
              type="search"
              placeholder="Search research, tools, frameworks…"
              className="input-pill shadow-sm"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-16">
          <Tabs
            className="w-full"
            defaultValue="paper"
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as ResearchType)}
          >
            <TabsList className="mx-auto max-w-3xl">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mx-auto mt-6 max-w-2xl text-center text-muted">
              {activeBlurb}
            </div>

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} className="mt-12">
                <ResearchGrid type={category.value} searchQuery={searchQuery} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
