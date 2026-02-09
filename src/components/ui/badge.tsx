import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'secondary' | 'outline';
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const baseStyles = 'badge';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'badge-primary',
  secondary: 'badge-neutral',
  outline: 'badge-outline',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}
