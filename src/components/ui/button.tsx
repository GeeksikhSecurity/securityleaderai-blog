import React, { forwardRef, isValidElement, cloneElement } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const baseStyles = 'btn disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<ButtonVariant, string> = {
  default: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  secondary: 'btn-secondary',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: '',
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export function buttonVariants(
  options: { variant?: ButtonVariant; size?: ButtonSize } = {},
): string {
  const { variant = 'default', size = 'default' } = options;
  return cn(baseStyles, variantStyles[variant], sizeStyles[size]);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'default', className, asChild, children, ...rest },
    ref,
  ) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (asChild && isValidElement<{ className?: string }>(children)) {
      return cloneElement(children, {
        ...rest,
        className: cn(classes, children.props.className),
      } as Record<string, unknown>);
    }

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
