import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Estrategia } from '../../../models/configuraciones/estrategia.model';
import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';
import { EstrategiaService } from '../../../services/configuraciones/estrategia.service';
@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css'],
})
export class EstrategiasComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public estrategias: Estrategia[] = [];
  private imgSubs: Subscription;

  constructor(
    private estrategiaService: EstrategiaService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarEstrategias();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarEstrategias());
  }

  cargarEstrategias() {
    this.cargando = true;
    this.estrategiaService
      .cargarEstrategias()
      .subscribe((estrategias) => {
        this.cargando = false;
        this.estrategias = estrategias;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarEstrategias();
    }

    this.busquedasService
      .buscar('estrategias', termino)
      .subscribe((resp: Estrategia[]) => {
        this.estrategias = resp;
      });
  }


  borrarEstrategia(estrategia: Estrategia) {
    Swal.fire({
      title: '¿Borrar estrategia?',
      text: `Esta a punto de borrar a ${estrategia.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.estrategiaService
          .borrarEstrategia(estrategia._id)
          .subscribe((resp) => {
            this.cargarEstrategias();
            Swal.fire(
              'Estrategia borrada',
              `${estrategia.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }
}
