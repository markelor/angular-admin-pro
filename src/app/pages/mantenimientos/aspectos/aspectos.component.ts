import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Aspecto } from '../../../models/aspecto.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { AspectoService } from '../../../services/aspecto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-aspectos',
  templateUrl: './aspectos.component.html',
  styles: [],
})
export class AspectosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public aspectos: Aspecto[] = [];
  private imgSubs: Subscription;

  constructor(
    private aspectoService: AspectoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarAspectos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarAspectos());
  }

  cargarAspectos() {
    this.cargando = true;
    this.aspectoService.cargarAspectos().subscribe((aspectos) => {
      this.cargando = false;
      this.aspectos = aspectos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarAspectos();
    }

    this.busquedasService.buscar('aspectos', termino).subscribe((resp:Aspecto[]) => {
      this.aspectos = resp;
    });
  }



  borrarAspecto(aspecto: Aspecto) {
    Swal.fire({
      title: '¿Borrar aspecto?',
      text: `Esta a punto de borrar a ${aspecto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.aspectoService.borrarAspecto(aspecto._id).subscribe((resp) => {
          this.cargarAspectos();
          Swal.fire(
            'Aspecto borrado',
            `${aspecto.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
