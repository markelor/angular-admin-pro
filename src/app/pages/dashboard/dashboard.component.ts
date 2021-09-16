import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';
import { HistoricoPartido } from 'src/app/models/estrategias/historico-partido.model';
import { EstrategiaService } from 'src/app/services/configuraciones/estrategia.service';
import { PartidoService } from 'src/app/services/mantenimientos/partido.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  public dtTriggerPartidosJugadoresRegistrados: Subject<any> = new Subject();
  //public dtTriggerPartidosJugadoresNoRegistrados: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {};
  public cargando: boolean = true;
  public partidosJugadoresRegistrados: any[] = [];
  public estrategiaForm: FormGroup;
  public estrategias: Estrategia[] = [];
  constructor(
    private partidoService: PartidoService,
    private estrategiaService: EstrategiaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializar datos
    this.dtOptions = this.buildDtOptions();
    this.estrategiaForm = this.fb.group({
      estrategia: new FormControl('', Validators.required),
    });
    this.cargarEstrategias();
  }

  cargarEstrategias() {
    this.cargando = true;
    this.estrategiaService.cargarEstrategias().subscribe((estrategias) => {
      this.cargando = false;
      this.estrategias = estrategias;
    });
  }
  cargarPartidos(estrategia: Estrategia) {
    this.cargando = true;
    this.partidoService
      .cargarPartidosDiarios(estrategia)
      .subscribe((partidosJugadoresRegistrados: any) => {
        console.log(partidosJugadoresRegistrados);
        this.cargando = false;
        partidosJugadoresRegistrados.forEach((partidoJugadorRegistrado) => {
          const jugador1Puntos =
            partidoJugadorRegistrado.jugador1Natal.relacionesPlanetarias
              .totalPuntosAspectos +
            partidoJugadorRegistrado.jugador1Natal.relacionesPlanetarias
              .totalPuntosCompatibilidad +
            partidoJugadorRegistrado.jugador1Transitos.relacionesPlanetarias
              .totalPuntosAspectos +
            partidoJugadorRegistrado.jugador1Transitos.relacionesPlanetarias
              .totalPuntosCompatibilidad;
          const jugador2Puntos =
            partidoJugadorRegistrado.jugador2Natal.relacionesPlanetarias
              .totalPuntosAspectos +
            partidoJugadorRegistrado.jugador2Natal.relacionesPlanetarias
              .totalPuntosCompatibilidad +
            partidoJugadorRegistrado.jugador2Transitos.relacionesPlanetarias
              .totalPuntosAspectos +
            partidoJugadorRegistrado.jugador2Transitos.relacionesPlanetarias
              .totalPuntosCompatibilidad;
          partidoJugadorRegistrado.partido.jugador1Puntos = jugador1Puntos;
          partidoJugadorRegistrado.partido.jugador2Puntos = jugador2Puntos;
          if (jugador1Puntos > jugador2Puntos) {
            partidoJugadorRegistrado.partido.ganador =
              partidoJugadorRegistrado.partido.jugador1.nombre;
            partidoJugadorRegistrado.partido.diferenciaPuntos = Math.abs(
              jugador1Puntos - jugador2Puntos
            );
          } else if (jugador1Puntos < jugador2Puntos) {
            partidoJugadorRegistrado.partido.ganador =
              partidoJugadorRegistrado.partido.jugador2.nombre;
            partidoJugadorRegistrado.partido.diferenciaPuntos = Math.abs(
              jugador2Puntos - jugador1Puntos
            );
          } else {
            partidoJugadorRegistrado.partido.ganador = 'Empate';
            partidoJugadorRegistrado.partido.diferenciaPuntos = 0;
          }
        });
        this.partidosJugadoresRegistrados = partidosJugadoresRegistrados;
        this.dtTriggerPartidosJugadoresRegistrados.next();
      });
  }
  private buildDtOptions() {
    return {
      pageLength: 10,
      dom: 'Bfrtip',
      order: [
        [1, 'desc'],
        [2, 'desc'],
      ],
      // Configure the buttons
      buttons: ['columnsToggle', 'colvis', 'copy', 'print', 'excel', 'pdf'],
      select: true,
      retrieve: true,
    };
  }
  ngOnDestroy() {
    this.dtTriggerPartidosJugadoresRegistrados.unsubscribe();
  }
}
