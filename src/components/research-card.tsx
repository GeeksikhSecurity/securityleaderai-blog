import type { ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  VideoIcon,
  CodeIcon,
} from '@/components/icons';
import type { ResearchItem } from '@/lib/research';

type ResearchCardProps = ResearchItem;

const cardIcons: Record<ResearchItem['type'], ComponentType<{ className?: string }>> = {
  paper: FileTextIcon,
  video: VideoIcon,
  insight: FileTextIcon,
  tool: CodeIcon,
};

const typeLabels: Record<ResearchItem['type'], string> = {
  paper: 'Research Paper',
  video: 'Video & Demo',
  insight: 'Insight',
  tool: 'Tool / Framework',
};

export function ResearchCard({
  slug,
  title,
  summary,
  type,
  visual,
  date,
  readTime,
  tags,
}: ResearchCardProps) {
  const Icon = cardIcons[type];

  return (
    <Link href={`/research/${slug}`} className="group block h-full">
      <Card className="card-clickable h-full overflow-hidden p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={visual}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw"
            priority={false}
          />
          <div className="absolute left-5 top-5">
            <Badge variant="secondary" className="flex items-center gap-2 !normal-case">
              <Icon className="h-4 w-4" />
              {typeLabels[type]}
            </Badge>
          </div>
          {type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-lg transition-transform duration-200 group-hover:scale-110">
                <VideoIcon className="h-7 w-7" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-xl font-semibold leading-tight text-primary-800 transition-colors duration-200 group-hover:text-primary-600">
              {title}
            </h3>
            <p className="mt-3 text-sm text-muted line-clamp-3">
              {summary}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="!normal-case">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardFooter className="mt-0 flex-wrap justify-between border-t border-color px-6 py-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary-600" />
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary-600" />
              <span>{readTime} min read</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
