import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CompatibilidadPlanetaria } from '../../../models/configuraciones/compatibilidad-planetaria.model';

import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { CompatibilidadPlanetariaService } from '../../../services/configuraciones/compatibilidad-planetaria.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';

@Component({
  selector: 'app-compatibilidades-planetarias',
  templateUrl: './compatibilidades-planetarias.component.html',
  styleUrls: ['./compatibilidades-planetarias.component.css'],
})
export class CompatibilidadesPlanetariasComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public compatibilidadesPlanetarias: CompatibilidadPlanetaria[] = [];
  private imgSubs: Subscription;

  constructor(
    private compatibilidadPlanetariaService: CompatibilidadPlanetariaService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCompatibilidadesPlanetarias();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarCompatibilidadesPlanetarias());
  }

  cargarCompatibilidadesPlanetarias() {
    this.cargando = true;
    this.compatibilidadPlanetariaService
      .cargarCompatibilidadesPlanetarias()
      .subscribe((compatibilidadesPlanetarias) => {
        this.cargando = false;
        this.compatibilidadesPlanetarias = compatibilidadesPlanetarias;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarCompatibilidadesPlanetarias();
    }

    this.busquedasService
      .buscar('compatibilidades-planetarias', termino)
      .subscribe((resp: CompatibilidadPlanetaria[]) => {
        this.compatibilidadesPlanetarias = resp;
      });
  }


  borrarCompatibilidadPlanetaria(compatibilidadPlanetaria: CompatibilidadPlanetaria) {
    Swal.fire({
      title: '¿Borrar compatibilidad planetaria?',
      text: `Esta a punto de borrar a ${compatibilidadPlanetaria.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.compatibilidadPlanetariaService
          .borrarCompatibilidadPlanetaria(compatibilidadPlanetaria._id)
          .subscribe((resp) => {
            this.cargarCompatibilidadesPlanetarias();
            Swal.fire(
              'Compatibilidad planetaria borrada',
              `${compatibilidadPlanetaria.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }
}
