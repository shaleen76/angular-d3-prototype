import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule).then((ref: any) => {
  const _window = window as any;
  if (_window['ngRef']) {
    _window['ngRef'].destroy();
  }
  _window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
