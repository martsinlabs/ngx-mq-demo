import { CommonModule } from '@angular/common';
import { Component, Inject, Signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { matchMediaSignal, MQ_BREAKPOINTS, MqBreakpoints } from 'ngx-mq';
import { isDesktop, isMobile, isTablet } from './utils/viewport-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isMobile: Signal<boolean> = isMobile();

  isTablet: Signal<boolean> = isTablet();

  isDesktop: Signal<boolean> = isDesktop();

  isLandscape: Signal<boolean> = matchMediaSignal('(orientation: landscape)');

  constructor(@Inject(MQ_BREAKPOINTS) public breakpoints: MqBreakpoints) {}
}
