import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';




const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./dashboard/dashboard-child-routes.module').then( m => m.DashboardChildRoutesModule )
},

    {
      path: 'mantenimientos',
      component: PagesComponent,
      canActivate: [ AuthGuard ],
      canLoad: [ AuthGuard ],
      loadChildren: () => import('./mantenimientos/mantenimientos-child-routes.module').then( m => m.MantenimientosChildRoutesModule )
  },
  {
    path: 'configuraciones',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./configuraciones/configuraciones-child-routes.module').then( m => m.ConfiguracionesChildRoutesModule )
},
{
  path: 'estrategias',
  component: PagesComponent,
  canActivate: [ AuthGuard ],
  canLoad: [ AuthGuard ],
  loadChildren: () => import('./estrategias/estrategias-child-routes.module').then( m => m.EstrategiasChildRoutesModule )
},
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


