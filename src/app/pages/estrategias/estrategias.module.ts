import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { DataTablesModule } from 'angular-datatables';
import { HistoricoPartidosComponent } from './historico-partidos/historico-partidos.component';


@NgModule({
  declarations: [
    HistoricoPartidosComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    PipesModule,
    DataTablesModule
  ]
})
export class EstrategiasModule { }
