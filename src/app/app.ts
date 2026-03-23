import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LegacyHost } from "./legacy-host/legacy-host";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LegacyHost],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shell-angular21');
}
