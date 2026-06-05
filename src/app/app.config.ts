import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideSsrValue, provideTailwindBreakpoints } from 'ngx-mq';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless change detection: ngx-mq signals drive every update, no Zone.js.
    provideZonelessChangeDetection(),
    // Registers Tailwind's breakpoint scale (sm/md/lg/xl/2xl) behind MQ_BREAKPOINTS.
    provideTailwindBreakpoints(),
    // SSR-safe defaults: queries report `true` before `matchMedia` is available.
    provideSsrValue(true),
  ],
};
