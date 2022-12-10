import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';

import { AgruparPipe } from './agrupar.pipe';



@NgModule({
  declarations: [ ImagenPipe,AgruparPipe ],
  exports: [ ImagenPipe,AgruparPipe ],
  providers:[AgruparPipe]
})
export class PipesModule { }
