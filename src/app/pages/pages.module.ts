import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DeportesComponent } from './mantenimientos/deportes/deportes.component';
import { JugadoresComponent } from './mantenimientos/jugadores/jugadores.component';
import { JugadorComponent } from './mantenimientos/jugadores/jugador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PartidosComponent } from './mantenimientos/partidos/partidos.component';
import { PartidoComponent } from './mantenimientos/partidos/partido.component';
import { DataTablesModule } from 'angular-datatables';
import { RelacionesPlanetariasComponent } from './configuraciones/relaciones-planetarias/relaciones-planetarias.component';
import { RelacionPlanetariaComponent } from './configuraciones/relaciones-planetarias/relacion-planetaria.component';
import { CompatibilidadesPlanetariasComponent } from './configuraciones/compatibilidades-planetarias/compatibilidades-planetarias.component';
import { CompatibilidadPlanetariaComponent } from './configuraciones/compatibilidades-planetarias/compatibilidad-planetaria.component';
import { CuerposCelestesComponent } from './mantenimientos/cuerpos-celestes/cuerpos-celestes.component';
import { CuerpoCelesteComponent } from './mantenimientos/cuerpos-celestes/cuerpo-celeste.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    DeportesComponent,
    JugadoresComponent,
    JugadorComponent,
    PartidosComponent,
    PartidoComponent,
    RelacionesPlanetariasComponent,
    RelacionPlanetariaComponent,
    CompatibilidadesPlanetariasComponent,
    CompatibilidadPlanetariaComponent,
    CuerposCelestesComponent,
    CuerpoCelesteComponent,
    BusquedaComponent

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
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
export class PagesModule { }
