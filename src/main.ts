import { initFederation } from '@angular-architects/native-federation';
import { initLanguage } from './app/i18n-init';

initLanguage();

initFederation('federation.manifest.json')
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
