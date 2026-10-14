import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routesApp } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routesApp)
  ]
};
