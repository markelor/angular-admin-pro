import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DeportesComponent } from './mantenimientos/deportes/deportes.component';
import { PartidosComponent } from './mantenimientos/partidos/partidos.component';
import { PartidoComponent } from './mantenimientos/partidos/partido.component';
import { JugadoresComponent } from './mantenimientos/jugadores/jugadores.component';
import { JugadorComponent } from './mantenimientos/jugadores/jugador.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RelacionesPlanetariasComponent } from './configuraciones/relaciones-planetarias/relaciones-planetarias.component';
import { RelacionPlanetariaComponent } from './configuraciones/relaciones-planetarias/relacion-planetaria.component';

import { CompatibilidadesPlanetariasComponent } from './configuraciones/compatibilidades-planetarias/compatibilidades-planetarias.component';
import { CompatibilidadPlanetariaComponent } from './configuraciones/compatibilidades-planetarias/compatibilidad-planetaria.component';
import { CuerposCelestesComponent } from './mantenimientos/cuerpos-celestes/cuerpos-celestes.component';
import { CuerpoCelesteComponent } from './mantenimientos/cuerpos-celestes/cuerpo-celeste.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busquedas' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { titulo: 'Gráfica #1' },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil de usuario' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { titulo: 'ProgressBar' },
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: { titulo: 'Promesas' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

  // Mantenimientos
  {
    path: 'deportes',
    component: DeportesComponent,
    data: { titulo: 'Mantenimiento de Deportes' },
  },
  {
    path: 'jugadores',
    component: JugadoresComponent,
    data: { titulo: 'Mantenimiento de Jugadores' },
  },
  {
    path: 'jugador/:id',
    component: JugadorComponent,
    data: { titulo: 'Mantenimiento de Jugador' },
  },
  {
    path: 'partidos',
    component: PartidosComponent,
    data: { titulo: 'Mantenimiento de Partidos' },
  },
  {
    path: 'partido/:id',
    component: PartidoComponent,
    data: { titulo: 'Mantenimiento de Partido' },
  },
  {
    path: 'cuerpos-celestes',
    component: CuerposCelestesComponent,
    data: { titulo: 'Mantenimiento de cuerpos celestes' },
  },
  {
    path: 'cuerpo-celeste/:id',
    component: CuerpoCelesteComponent,
    data: { titulo: 'Mantenimiento de cuerpo celeste' },
  },


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


  // Rutas de Admin
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Mantenimiento de Usuarios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
