import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent {
  time = 0;
  running = false;
  interval: any;

  start() {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => this.time++, 1000);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    this.time = 0;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
    const seconds = (this.time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
