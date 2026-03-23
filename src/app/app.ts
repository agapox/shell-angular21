import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LegacyHost } from "./legacy-host/legacy-host";
import { Mfe21Host } from './mfe21-host/mfe21-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LegacyHost, Mfe21Host],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('shell-angular21');
}
