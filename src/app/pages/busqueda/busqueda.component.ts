import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Deporte } from 'src/app/models/deporte.model';
import { Jugador } from '../../models/jugador.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public jugadores: Jugador[] = [];
  public deportes: Deporte[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.jugadores    = resp.jugadores;
          this.deportes = resp.deportes;
        });

  }


  abrirJugador( jugador: Jugador ) {

  }

}
