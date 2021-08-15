import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CuerpoCeleste } from '../../../models/mantenimientos/cuerpo-celeste.model';

import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { CuerpoCelesteService } from '../../../services/mantenimientos/cuerpo-celeste.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';

@Component({
  selector: 'app-cuerpos-celestes',
  templateUrl: './cuerpos-celestes.component.html',
  styleUrls: ['./cuerpos-celestes.component.css'],
})
export class CuerposCelestesComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public cuerposCelestes: CuerpoCeleste[] = [];
  private imgSubs: Subscription;

  constructor(
    private cuerpoCelesteService: CuerpoCelesteService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCuerposCelestes();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarCuerposCelestes());
  }

  cargarCuerposCelestes() {
    this.cargando = true;
    this.cuerpoCelesteService
      .cargarCuerposCelestes()
      .subscribe((cuerposCelestes) => {
        this.cargando = false;
        this.cuerposCelestes = cuerposCelestes;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarCuerposCelestes();
    }

    this.busquedasService
      .buscar('cuerpos-celestes', termino)
      .subscribe((resp: CuerpoCeleste[]) => {
        this.cuerposCelestes = resp;
      });
  }


  borrarCuerpoCeleste(cuerpoCeleste: CuerpoCeleste) {
    Swal.fire({
      title: '¿Borrar compatibilidad planetaria?',
      text: `Esta a punto de borrar a ${cuerpoCeleste.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.cuerpoCelesteService
          .borrarCuerpoCeleste(cuerpoCeleste._id)
          .subscribe((resp) => {
            this.cargarCuerposCelestes();
            Swal.fire(
              'Compatibilidad planetaria borrada',
              `${cuerpoCeleste.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }
}
