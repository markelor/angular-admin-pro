import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstrategiasComponent } from './estrategias/estrategias.component';
const childRoutes: Routes = [
  { path: '', component: EstrategiasComponent,/* data: { titulo: 'Dashboard' }*/ },
  // Configuraciones
  {
    path: 'estrategias',
    component: EstrategiasComponent,
    data: { titulo: 'Estrategias' },
  },
 /* {
    path: 'estrategia/:id',
    component:EstrategiasComponent,
    data: { titulo: 'Configuracion de relacion planetaria' },
  }*/

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class EstrategiasChildRoutesModule {}
