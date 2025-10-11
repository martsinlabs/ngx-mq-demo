import { Signal } from '@angular/core';
import { up, down, between } from 'ngx-mq';

export const isMobile = (): Signal<boolean> => down('md');
export const isTablet = (): Signal<boolean> => between('md', 'lg');
export const isDesktop = (): Signal<boolean> => up('lg');
