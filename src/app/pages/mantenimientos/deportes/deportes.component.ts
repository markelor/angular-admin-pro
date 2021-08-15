import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Deporte } from '../../../models/mantenimientos/deporte.model';

import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { DeporteService } from '../../../services/mantenimientos/deporte.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';;

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styles: [],
})
export class DeportesComponent implements OnInit, OnDestroy {
  public deportes: Deporte[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private deporteService: DeporteService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarDeportes();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarDeportes());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarDeportes();
    }

    this.busquedasService
      .buscar('deportes', termino)
      .subscribe((resp: Deporte[]) => {
        this.deportes = resp;
      });
  }

  cargarDeportes() {
    this.cargando = true;
    this.deporteService.cargarDeportes().subscribe((deportes) => {
      this.cargando = false;
      this.deportes = deportes;
    });
  }

  guardarCambios(deporte: Deporte) {
    this.deporteService
      .actualizarDeporte(deporte._id, deporte.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', deporte.nombre, 'success');
      });
  }

  eliminarDeporte(deporte: Deporte) {
    this.deporteService.borrarDeporte(deporte._id).subscribe((resp) => {
      this.cargarDeportes();
      Swal.fire('Borrado', deporte.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear deporte',
      text: 'Ingrese el nombre del nuevo deporte',
      input: 'text',
      inputPlaceholder: 'Nombre del deporte',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.deporteService.crearDeporte(value).subscribe((resp: any) => {
        this.deportes.push(resp.deporte);
      });
    }
  }

  abrirModal(deporte: Deporte) {
    this.modalImagenService.abrirModal('deportes', deporte._id, deporte.img);
  }
}
