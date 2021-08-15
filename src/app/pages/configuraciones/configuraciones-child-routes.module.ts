import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelacionesPlanetariasComponent } from './relaciones-planetarias/relaciones-planetarias.component';
import { RelacionPlanetariaComponent } from './relaciones-planetarias/relacion-planetaria.component';

import { CompatibilidadesPlanetariasComponent } from './compatibilidades-planetarias/compatibilidades-planetarias.component';
import { CompatibilidadPlanetariaComponent } from './compatibilidades-planetarias/compatibilidad-planetaria.component';

const childRoutes: Routes = [
  { path: '', component: RelacionesPlanetariasComponent,/* data: { titulo: 'Dashboard' }*/ },
  // Configuraciones
  {
    path: 'relaciones-planetarias',
    component: RelacionesPlanetariasComponent,
    data: { titulo: 'Configuracion de relaciones planetarias' },
  },
  {
    path: 'relacion-planetaria/:id',
    component: RelacionPlanetariaComponent,
    data: { titulo: 'Configuracion de relacion planetaria' },
  },
  {
    path: 'compatibilidades-planetarias',
    component: CompatibilidadesPlanetariasComponent,
    data: { titulo: 'Configuracion de compatibilidades planetarias' },
  },
  {
    path: 'compatibilidad-planetaria/:id',
    component: CompatibilidadPlanetariaComponent,
    data: { titulo: 'Configuracion de compatibilidad planetaria' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ConfiguracionesChildRoutesModule {}
