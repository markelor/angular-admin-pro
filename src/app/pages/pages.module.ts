import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { ConfiguracionesModule } from './configuraciones/configuraciones.module';
import { EstrategiasModule } from './estrategias/estrategias.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  exports: [
    PagesComponent,

  ],
  imports: [
    CommonModule,
    DashboardModule,
    MantenimientosModule,
    ConfiguracionesModule,
    EstrategiasModule,
    SharedModule,
    RouterModule,
    ComponentsModule,

  ]
})
export class PagesModule { }
