import { Component } from '@angular/core';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StopwatchComponent],
  template: `<app-stopwatch></app-stopwatch>`
})
export class AppComponent {

}

