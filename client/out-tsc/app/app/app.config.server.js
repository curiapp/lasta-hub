import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
const serverConfig = {
    providers: [provideServerRendering(withRoutes(serverRoutes))]
};
export const config = mergeApplicationConfig(appConfig, serverConfig);
