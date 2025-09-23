import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { renderApplication } from '@angular/platform-server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

// export default bootstrap;
export default function render(event: any) {
  return renderApplication(bootstrap, {
    url: event.url,
    document: event.document,
    context: event.context, // This is the crucial part
  });
}
