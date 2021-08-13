import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { RelacionPlanetaria } from '../../../models/configuraciones/relacion-planetaria.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { RelacionPlanetariaService } from '../../../services/configuraciones/relacion-planetaria.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-relaciones-planetarias',
  templateUrl: './relaciones-planetarias.component.html',
  styleUrls: ['./relaciones-planetarias.component.css'],
})
export class RelacionesPlanetariasComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public relacionesPlanetarias: RelacionPlanetaria[] = [];
  private imgSubs: Subscription;

  constructor(
    private relacionPlanetariaService: RelacionPlanetariaService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarRelacionesPlanetarias();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarRelacionesPlanetarias());
  }

  cargarRelacionesPlanetarias() {
    this.cargando = true;
    this.relacionPlanetariaService
      .cargarRelacionesPlanetarias()
      .subscribe((relacionesPlanetarias) => {
        this.cargando = false;
        this.relacionesPlanetarias = relacionesPlanetarias;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarRelacionesPlanetarias();
    }

    this.busquedasService
      .buscar('relaciones-planetarias', termino)
      .subscribe((resp: RelacionPlanetaria[]) => {
        this.relacionesPlanetarias = resp;
      });
  }


  borrarRelacionPlanetaria(relacionPlanetaria: RelacionPlanetaria) {
    Swal.fire({
      title: '¿Borrar relacion planetaria?',
      text: `Esta a punto de borrar a ${relacionPlanetaria.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.relacionPlanetariaService
          .borrarRelacionPlanetaria(relacionPlanetaria._id)
          .subscribe((resp) => {
            this.cargarRelacionesPlanetarias();
            Swal.fire(
              'Relacion planetaria borrada',
              `${relacionPlanetaria.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }
}
