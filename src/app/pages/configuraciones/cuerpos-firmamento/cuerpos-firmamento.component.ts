import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';



import { BusquedasService } from '../../../services/dashboard/busquedas.service';

import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';
import { CuerpoFirmamentoService } from 'src/app/services/configuraciones/cuerpo-firmamento.service';
import { CuerpoFirmamento } from 'src/app/models/configuraciones/cuerpo-firmamento.model';

@Component({
  selector: 'app-cuerpos-firmamento',
  templateUrl: './cuerpos-firmamento.component.html',
  styleUrls: ['./cuerpos-firmamento.component.css'],
})
export class CuerposFirmamentoComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public cuerposFirmamento: CuerpoFirmamento[] = [];
  private imgSubs: Subscription;

  constructor(
    private cuerpoFirmamentoService: CuerpoFirmamentoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCuerposFirmamentos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarCuerposFirmamentos());
  }

  cargarCuerposFirmamentos() {
    this.cargando = true;
    this.cuerpoFirmamentoService
      .cargarCuerposFirmamento()
      .subscribe((cuerposFirmamento) => {
        console.log(cuerposFirmamento);
        this.cargando = false;
        this.cuerposFirmamento = cuerposFirmamento;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarCuerposFirmamentos();
    }

    this.busquedasService
      .buscar('cuerpos-firmamento', termino)
      .subscribe((resp: CuerpoFirmamento[]) => {
        this.cuerposFirmamento = resp;
      });
  }


  borrarCuerpoFirmamento(cuerpoFirmamento: CuerpoFirmamento) {
    Swal.fire({
      title: '¿Borrar compatibilidad planetaria?',
      text: `Esta a punto de borrar a ${cuerpoFirmamento.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.cuerpoFirmamentoService
          .borrarCuerpoFirmamento(cuerpoFirmamento._id)
          .subscribe((resp) => {
            this.cargarCuerposFirmamentos();
            Swal.fire(
              'Compatibilidad planetaria borrada',
              `${cuerpoFirmamento.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }
}
