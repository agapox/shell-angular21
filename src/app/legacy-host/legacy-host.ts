import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { loadRemoteScript } from '../load-script';
import { loadRemoteStyle } from '../load-style';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-legacy-host',
  imports: [TranslatePipe],
  templateUrl: './legacy-host.html',
  styleUrl: './legacy-host.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LegacyHost implements OnInit {
  async ngOnInit() {
    await loadRemoteScript('http://localhost:4201/runtime.js');
    await loadRemoteScript('http://localhost:4201/polyfills.js');
    await loadRemoteScript('http://localhost:4201/vendor.js');
    await loadRemoteStyle('http://localhost:4201/styles.css');
    await loadRemoteScript('http://localhost:4201/main.js');
  }
}
