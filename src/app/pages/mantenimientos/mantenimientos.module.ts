import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { DeportesComponent } from './deportes/deportes.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { JugadorComponent } from './jugadores/jugador.component';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoComponent } from './partidos/partido.component';
import { CuerposCelestesComponent } from './cuerpos-celestes/cuerpos-celestes.component';
import { CuerpoCelesteComponent } from './cuerpos-celestes/cuerpo-celeste.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [

    UsuariosComponent,
    DeportesComponent,
    JugadoresComponent,
    JugadorComponent,
    PartidosComponent,
    PartidoComponent,
    CuerposCelestesComponent,
    CuerpoCelesteComponent,

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    DataTablesModule
  ]
})
export class MantenimientosModule { }
