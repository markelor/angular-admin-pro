import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoPartidosComponent } from '../estrategias/historico-partidos/historico-partidos.component';

const childRoutes: Routes = [
{ path: '', component: HistoricoPartidosComponent, data: { titulo: 'Historico partido' } },
{
  path: 'historico-partidos',
  component: HistoricoPartidosComponent,
  data: { titulo: 'Historico partidos' },
},

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class EstrategiasChildRoutesModule {}
