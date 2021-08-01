import {
  Component,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Jugador } from '../../../models/jugador.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { JugadorService } from '../../../services/jugador.service';
import { AstrologiaService } from '../../../services/astrologia.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
})
export class JugadoresComponent implements OnInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  public dtTriggerJugadoresRegistrados: Subject<any> = new Subject();
  public dtTriggerJugadoresNoRegistrados: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {};
  public cargando: boolean = true;
  public jugadoresRegistrados: Jugador[] = [];
  public jugadoresNoRegistrados: Jugador[] = [];
  private imgSubs: Subscription;

  constructor(
    private jugadorService: JugadorService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private astrologiaService: AstrologiaService
  ) {}

  ngOnInit(): void {
    // Inicializar datos
    this.dtOptions = this.buildDtOptions();
    this.cargarJugadoresRegistrados();
    this.cargarJugadoresNoRegistrados();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarJugadoresRegistrados());
  }

  cargarJugadoresRegistrados() {
    this.cargando = true;
    this.jugadorService
      .cargarJugadoresRegistrados()
      .subscribe((jugadoresRegistrados) => {
        this.cargando = false;
        this.jugadoresRegistrados = jugadoresRegistrados;
        this.dtTriggerJugadoresRegistrados.next();
        this.dtTriggerJugadoresNoRegistrados.next();
      });
  }
  cargarJugadoresNoRegistrados() {
    this.cargando = true;
    this.jugadorService
      .cargarJugadoresNoRegistrados()
      .subscribe((jugadoresNoRegistrados) => {
        this.cargando = false;
        this.jugadoresNoRegistrados = jugadoresNoRegistrados;
        this.dtTriggerJugadoresRegistrados.next();
        this.dtTriggerJugadoresNoRegistrados.next();
        console.log(this.jugadoresNoRegistrados);
      });
  }
  cargarCartaNatal(jugador:Jugador){
    this.astrologiaService.cargarCartaNatal(jugador).subscribe(()=>{

    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarJugadoresRegistrados();
    }

    this.busquedasService
      .buscar('jugadores', termino)
      .subscribe((resp: Jugador[]) => {
        this.jugadoresRegistrados = resp;
      });
  }

  abrirModal(jugador: Jugador) {
    this.modalImagenService.abrirModal('jugadores', jugador._id, jugador.img);
  }

  borrarJugadorRegistrado(jugadorRegistrado: Jugador) {
    Swal.fire({
      title: '¿Borrar jugador?',
      text: `Esta a punto de borrar a ${jugadorRegistrado.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.dtTriggerJugadoresRegistrados.unsubscribe();
        this.dtTriggerJugadoresNoRegistrados.unsubscribe();
        this.jugadorService
          .borrarJugador(jugadorRegistrado._id)
          .subscribe((resp) => {
            this.dtElements.forEach(
              (dtElement: DataTableDirective, index: number) => {
                if (index === 0) {
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // Destroy the table first
                    dtInstance.destroy();
                    this.dtTriggerJugadoresRegistrados = new Subject();
                    this.dtTriggerJugadoresNoRegistrados = new Subject();
                    this.cargarJugadoresRegistrados();
                    Swal.fire(
                      'Jugador borrado',
                      `${jugadorRegistrado.nombre} fue eliminado correctamente`,
                      'success'
                    );
                  });
                }
              }
            );
          });
      }
    });
  }
  private buildDtOptions() {
    return {
      pageLength: 10,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: ['columnsToggle', 'colvis', 'copy', 'print', 'excel', 'pdf'],
      responsive: true,
      destroy: true,
    };
  }
  ngOnDestroy() {
    this.imgSubs.unsubscribe();
    this.dtTriggerJugadoresRegistrados.unsubscribe();
    this.dtTriggerJugadoresNoRegistrados.unsubscribe();
  }
}
