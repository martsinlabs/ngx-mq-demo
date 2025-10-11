import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideTailwindBreakpoints } from 'ngx-mq';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTailwindBreakpoints(), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};
