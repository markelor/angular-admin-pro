import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const childRoutes: Routes = [
  //{ path: '', component: EstrategiasComponent,/* data: { titulo: 'Dashboard' }*/ },


];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class EstrategiasChildRoutesModule {}
