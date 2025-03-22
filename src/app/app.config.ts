import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SalesPredictionComponent } from './components/sales-prediction/sales-prediction.component';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  { path: '', component: SalesPredictionComponent }, // Ruta principal
  { path: '**', redirectTo: '' } // Redirección a la página principal si no hay coincidencia
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Se agregan rutas
    provideAnimations(),
    provideHttpClient(),
    // provideMomentDateAdapter(), // Usa Moment como adaptador de fecha
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Cambia el idioma si lo deseas
    MatNativeDateModule
  ]
};
function provideMomentDateAdapter(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

