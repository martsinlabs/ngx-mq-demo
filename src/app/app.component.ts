import {
  Component,
  computed,
  HostListener,
  inject,
  Signal,
  signal,
} from '@angular/core';
import {
  and,
  anyHover,
  anyPointer,
  colorGamut,
  colorScheme,
  displayMode,
  down,
  hover,
  MQ_BREAKPOINTS,
  not,
  or,
  orientation,
  pointer,
  reducedMotion,
  up,
} from 'ngx-mq';
import { isDesktop, isMobile, isTablet } from './utils/viewport-utils';

/** One uniform card: a code snippet plus the live boolean it evaluates to. */
interface QueryCard {
  code: string;
  on: Signal<boolean>;
  name?: string;
  hint?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Tailwind breakpoint scale registered via `provideTailwindBreakpoints()`. */
  readonly breakpoints = inject(MQ_BREAKPOINTS);

  // --- Live viewport readout (updated on resize, zoneless-friendly) ----------
  readonly width = signal(window.innerWidth);
  readonly height = signal(window.innerHeight);

  @HostListener('window:resize')
  protected onResize(): void {
    this.width.set(window.innerWidth);
    this.height.set(window.innerHeight);
  }

  // --- Breakpoints: up / down / between --------------------------------------
  readonly isMobile = isMobile();
  readonly isTablet = isTablet();
  readonly isDesktop = isDesktop();

  /** Active range as a single label for the hero chip. */
  readonly device = computed(() =>
    this.isMobile() ? 'MOBILE' : this.isTablet() ? 'TABLET' : 'DESKTOP',
  );

  readonly breakpointCards: QueryCard[] = [
    {
      name: 'isMobile',
      code: "down('md')",
      on: this.isMobile,
      hint: `Viewport < ${this.breakpoints['md']}px`,
    },
    {
      name: 'isTablet',
      code: "between('md', 'lg')",
      on: this.isTablet,
      hint: `${this.breakpoints['md']}px – ${this.breakpoints['lg']}px`,
    },
    {
      name: 'isDesktop',
      code: "up('lg')",
      on: this.isDesktop,
      hint: `Viewport ≥ ${this.breakpoints['lg']}px`,
    },
  ];

  // --- Media features (new surface in 3.0) -----------------------------------
  readonly featureCards: QueryCard[] = [
    { code: "orientation('landscape')", on: orientation('landscape') },
    { code: "colorScheme('dark')", on: colorScheme('dark') },
    { code: 'reducedMotion()', on: reducedMotion() },
    { code: 'hover()', on: hover() },
    { code: 'anyHover()', on: anyHover() },
    { code: "pointer('coarse')", on: pointer('coarse') },
    { code: "anyPointer('fine')", on: anyPointer('fine') },
    { code: "colorGamut('p3')", on: colorGamut('p3') },
    { code: "displayMode('standalone')", on: displayMode('standalone') },
  ];

  // --- Composition: and / or / not -------------------------------------------
  readonly compositionCards: QueryCard[] = [
    {
      code: "and(up('lg'), orientation('landscape'), hover())",
      on: and(up('lg'), orientation('landscape'), hover()),
    },
    {
      code: "or(down('md'), reducedMotion())",
      on: or(down('md'), reducedMotion()),
    },
    { code: 'not(hover())', on: not(hover()) },
  ];
}
