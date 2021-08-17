import { NgModule } from '@angular/core';
import { RelacionesPlanetariasComponent } from './relaciones-planetarias/relaciones-planetarias.component';
import { RelacionPlanetariaComponent } from './relaciones-planetarias/relacion-planetaria.component';
import { CompatibilidadesPlanetariasComponent } from './compatibilidades-planetarias/compatibilidades-planetarias.component';
import { CompatibilidadPlanetariaComponent } from './compatibilidades-planetarias/compatibilidad-planetaria.component';
import { CuerposFirmamentoComponent } from './cuerpos-firmamento/cuerpos-firmamento.component';
import { CuerpoFirmamentoComponent } from './cuerpos-firmamento/cuerpo-firmamento.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DataTablesModule } from 'angular-datatables';





@NgModule({
  declarations: [
    RelacionesPlanetariasComponent,
    RelacionPlanetariaComponent,
    CompatibilidadesPlanetariasComponent,
    CompatibilidadPlanetariaComponent,
    CuerposFirmamentoComponent,
    CuerpoFirmamentoComponent,
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
export class ConfiguracionesModule { }
