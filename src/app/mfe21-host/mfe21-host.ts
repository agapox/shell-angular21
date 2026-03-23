import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-mfe21-host',
  imports: [],
  templateUrl: './mfe21-host.html',
  styleUrl: './mfe21-host.scss',
})
export class Mfe21Host implements OnInit {
  private vcr = inject(ViewContainerRef);

  async ngOnInit() {
    const module = await loadRemoteModule('mfe1', './Component');
    this.vcr.createComponent(module.RemoteEntry);
  }
}
