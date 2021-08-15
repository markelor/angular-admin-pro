import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DeportesComponent } from './deportes/deportes.component';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoComponent } from './partidos/partido.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { JugadorComponent } from './jugadores/jugador.component';

import { AdminGuard } from '../../guards/admin.guard';

import { CuerposCelestesComponent } from './cuerpos-celestes/cuerpos-celestes.component';
import { CuerpoCelesteComponent } from './cuerpos-celestes/cuerpo-celeste.component';

const childRoutes: Routes = [
  { path: '', component: DeportesComponent,/* data: { titulo: 'Dashboard' }*/ },

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
export class MantenimientosChildRoutesModule {}
