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

/** A syntax-highlighted slice of a code snippet. */
interface Token {
  t: string;
  k: 'fn' | 'str' | 'punct';
}

/** Splits a query snippet into colorable tokens (function / string / punctuation). */
function tokenize(code: string): Token[] {
  const re = /('[^']*')|([A-Za-z]\w*)|([(),]|\s+)/g;
  const out: Token[] = [];
  for (let m = re.exec(code); m; m = re.exec(code)) {
    if (m[1]) out.push({ t: m[1], k: 'str' });
    else if (m[2]) out.push({ t: m[2], k: 'fn' });
    else out.push({ t: m[3], k: 'punct' });
  }
  return out;
}

/** One uniform card: a code snippet plus the live boolean it evaluates to. */
interface QueryCard {
  code: string;
  tokens: Token[];
  on: Signal<boolean>;
  name?: string;
  hint?: string;
}

/** Builds a card, precomputing the highlighted tokens once. */
function card(
  code: string,
  on: Signal<boolean>,
  extra?: { name?: string; hint?: string },
): QueryCard {
  return { code, tokens: tokenize(code), on, ...extra };
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
    card("down('md')", this.isMobile, {
      name: 'isMobile',
      hint: `Viewport < ${this.breakpoints['md']}px`,
    }),
    card("between('md', 'lg')", this.isTablet, {
      name: 'isTablet',
      hint: `${this.breakpoints['md']}px – ${this.breakpoints['lg']}px`,
    }),
    card("up('lg')", this.isDesktop, {
      name: 'isDesktop',
      hint: `Viewport ≥ ${this.breakpoints['lg']}px`,
    }),
  ];

  // --- Media features (new surface in 3.0) -----------------------------------
  readonly featureCards: QueryCard[] = [
    card("orientation('landscape')", orientation('landscape')),
    card("colorScheme('dark')", colorScheme('dark')),
    card('reducedMotion()', reducedMotion()),
    card('hover()', hover()),
    card('anyHover()', anyHover()),
    card("pointer('coarse')", pointer('coarse')),
    card("anyPointer('fine')", anyPointer('fine')),
    card("colorGamut('p3')", colorGamut('p3')),
    card("displayMode('standalone')", displayMode('standalone')),
  ];

  // --- Composition: and / or / not -------------------------------------------
  readonly compositionCards: QueryCard[] = [
    card(
      "and(up('lg'), orientation('landscape'), hover())",
      and(up('lg'), orientation('landscape'), hover()),
    ),
    card("or(down('md'), reducedMotion())", or(down('md'), reducedMotion())),
    card('not(hover())', not(hover())),
  ];
}
