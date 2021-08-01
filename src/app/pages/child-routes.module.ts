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
import { AspectosComponent } from './mantenimientos/aspectos/aspectos.component';
import { AspectoComponent } from './mantenimientos/aspectos/aspecto.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

  // Mantenimientos
  { path: 'deportes', component: DeportesComponent, data: { titulo: 'Mantenimiento de Deportes' }},
  { path: 'jugadores', component: JugadoresComponent, data: { titulo: 'Mantenimiento de Jugadores' }},
  { path: 'jugador/:id', component: JugadorComponent, data: { titulo: 'Mantenimiento de Jugador' }},
  { path: 'partidos', component: PartidosComponent, data: { titulo: 'Mantenimiento de Partidos' }},
  { path: 'partido/:id', component: PartidoComponent, data: { titulo: 'Mantenimiento de Partido' }},
  { path: 'aspectos', component: AspectosComponent, data: { titulo: 'Mantenimiento de Aspectos' }},
  { path: 'aspecto/:id', component: AspectoComponent, data: { titulo: 'Mantenimiento de Aspecto' }},

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
