import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { loadRemoteScript } from '../load-script';

@Component({
  selector: 'app-legacy-host',
  imports: [],
  templateUrl: './legacy-host.html',
  styleUrl: './legacy-host.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LegacyHost implements OnInit {
  async ngOnInit() {
    const scripts = [
      'http://localhost:4201/runtime.js',
      'http://localhost:4201/polyfills.js',
      'http://localhost:4201/vendor.js',
      'http://localhost:4201/styles.js',
      'http://localhost:4201/main.js',
    ];

    for (const script of scripts) {
      await loadRemoteScript(script);
    }

    console.log('MFE Angular 13 debería estar listo');
  }
}
