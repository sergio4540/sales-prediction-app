// app.routes.ts
import { Routes } from '@angular/router';
import { SalesPredictionComponent } from './components/sales-prediction/sales-prediction.component';

export const routes: Routes = [
  { path: '', component: SalesPredictionComponent }, // Ruta por defecto, vuelve a Sales Prediction
  { path: 'sales-prediction', component: SalesPredictionComponent },
  { path: '**', redirectTo: '' } // Ruta comodín, redirige a Sales Prediction
];
