import type { ComponentProps } from 'react';
import { cx } from './classNames';

export type SectionSpacing = 'sm' | 'md' | 'lg';

export interface SectionProps extends ComponentProps<'section'> {
  spacing?: SectionSpacing;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'space-y-8 py-8',
  md: 'space-y-12 py-12',
  lg: 'space-y-16 py-16',
};

export function Section({ spacing = 'md', className, ...props }: SectionProps) {
  return <section className={cx('relative', spacingClasses[spacing], className)} {...props} />;
}
