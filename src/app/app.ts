import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LegacyHost } from "./legacy-host/legacy-host";
import { Mfe21Host } from './mfe21-host/mfe21-host';
import { AppLanguage, getStoredLanguage, onGlobalLanguageChange, setGlobalLanguage } from '@platform/i18n';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    TranslatePipe,
    LegacyHost,
    Mfe21Host,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  langControl = new FormControl<AppLanguage | null>(null);
  translateService = inject(TranslateService);
  private removeLanguageListener?: () => void;

  ngOnInit() {
    const lang = getStoredLanguage();

    this.translateService.use(lang);
    this.langControl.setValue(lang, { emitEvent: false });

    this.removeLanguageListener = onGlobalLanguageChange((newLang) => {
      this.translateService.use(newLang);
      this.langControl.setValue(newLang, { emitEvent: false });
    });

    this.onFormChange();
  }

  onFormChange() {
    this.langControl.valueChanges.subscribe((lang) => {
      if (!lang) return;
      setGlobalLanguage(lang);
    });
  }

  ngOnDestroy() {
    this.removeLanguageListener?.();
  }
}
