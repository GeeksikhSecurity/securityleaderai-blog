import { Suspense } from 'react';
import ResearchHub from './research-hub';

function ResearchFallback() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container pb-20 pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 h-6 w-32 rounded-md bg-neutral-100" />
          <div className="mx-auto mb-4 h-10 w-2/3 rounded-md bg-neutral-100" />
          <div className="mx-auto h-5 w-1/2 rounded-md bg-neutral-100" />
        </div>
        <div className="mt-16 grid grid-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="h-64 rounded-lg border border-color bg-neutral-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<ResearchFallback />}>
      <ResearchHub />
    </Suspense>
  );
}
