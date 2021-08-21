import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';
import { EstrategiaService } from 'src/app/services/configuraciones/estrategia.service';
import Swal from 'sweetalert2';
import { HistoricoPartido } from '../../../models/estrategias/historico-partido.model';
import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';
import { HistoricoPartidoService } from '../../../services/estrategias/historico-partido.service';
@Component({
  selector: 'app-historico-partidos',
  templateUrl: './historico-partidos.component.html',
  styleUrls: ['./historico-partidos.component.css'],
})
export class HistoricoPartidosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public estrategias: Estrategia[] = [];
  public historicoPartidos: HistoricoPartido[] = [];
  public estrategiaForm: FormGroup;

  constructor(
    private estrategiaService: EstrategiaService,
    private historicoPartidoService: HistoricoPartidoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.estrategiaForm = this.fb.group({
      estrategia: new FormControl('', Validators.required),
    });
    this.cargarEstrategias();
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
  cargarHistoricoPartidos(estrategia:Estrategia) {
    console.log(estrategia);
    this.cargando = true;
    /*this.historicoPartidoService
      .cargarHistoricoPartidos()
      .subscribe((historicoPartidos) => {
        this.cargando = false;
        this.historicoPartidos = historicoPartidos;
      });*/
  }

  /*buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHistoricoPartidos();
    }

    this.busquedasService
      .buscar('compatibilidades-planetarias', termino)
      .subscribe((resp: HistoricoPartido[]) => {
        this.historicoPartidos = resp;
      });
  }


  borrarHistoricoPartido(historicoPartido: HistoricoPartido) {
    Swal.fire({
      title: '¿Borrar compatibilidad planetaria?',
      text: `Esta a punto de borrar a ${historicoPartido.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.historicoPartidoService
          .borrarHistoricoPartido(historicoPartido._id)
          .subscribe((resp) => {
            this.cargarHistoricoPartidos();
            Swal.fire(
              'Compatibilidad planetaria borrada',
              `${historicoPartido.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }*/
}
