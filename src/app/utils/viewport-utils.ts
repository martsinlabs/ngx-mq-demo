import { Signal } from '@angular/core';
import { between, down, up } from 'ngx-mq';

/** `true` while the viewport is narrower than the `md` breakpoint. */
export const isMobile = (): Signal<boolean> => down('md');

/** `true` while the viewport sits between `md` and `lg`. */
export const isTablet = (): Signal<boolean> => between('md', 'lg');

/** `true` while the viewport is at least `lg` wide. */
export const isDesktop = (): Signal<boolean> => up('lg');
