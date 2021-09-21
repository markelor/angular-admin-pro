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
import { AgruparPipe } from 'src/app/pipes/agrupar.pipe';
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
    private fb: FormBuilder,
    private agrupar: AgruparPipe
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
          let contPartidoGanadoRachaJugador1 = 0;
          let contRachaJugador1=0;
          partidoJugadorRegistrado.partido.jugador1HistoricoPartidos.forEach(
            (jugador1HistoricoPartido, index) => {
              //calcular ganador
              if (
                Number(jugador1HistoricoPartido.resultado.split(':')[0]) >
                Number(jugador1HistoricoPartido.resultado.split(':')[1])
              ) {
                jugador1HistoricoPartido.ganador =
                  jugador1HistoricoPartido.jugador1;
              } else if (
                Number(jugador1HistoricoPartido.resultado.split(':')[0]) <
                Number(jugador1HistoricoPartido.resultado.split(':')[1])
              ) {
                jugador1HistoricoPartido.ganador =
                  jugador1HistoricoPartido.jugador2;
              }

              if ((partidoJugadorRegistrado.partido.jugador1HistoricoPartidos.length - index) < 10) {
                contRachaJugador1++;
                //contar partidas ganadas
                console.log( partidoJugadorRegistrado.partido.jugador1.nombre);
                console.log(jugador1HistoricoPartido.ganador);
                if (
                  partidoJugadorRegistrado.partido.jugador1.nombre ===
                  jugador1HistoricoPartido.ganador
                ) {
                  contPartidoGanadoRachaJugador1++;
                }
              }
              partidoJugadorRegistrado.partido.rachaJugador1 =
                contPartidoGanadoRachaJugador1 +' de '+contRachaJugador1;
            }
          );
          let contPartidoGanadoRachaJugador2 = 0;
          let contRachaJugador2=0;

          partidoJugadorRegistrado.partido.jugador2HistoricoPartidos.forEach(
            (jugador2HistoricoPartido, index) => {
              if (
                Number(jugador2HistoricoPartido.resultado.split(':')[0]) >
                Number(jugador2HistoricoPartido.resultado.split(':')[1])
              ) {
                jugador2HistoricoPartido.ganador =
                  jugador2HistoricoPartido.jugador1;
              } else if (
                Number(jugador2HistoricoPartido.resultado.split(':')[0]) <
                Number(jugador2HistoricoPartido.resultado.split(':')[1])
              ) {
                jugador2HistoricoPartido.ganador =
                  jugador2HistoricoPartido.jugador2;
              }
              if ((partidoJugadorRegistrado.partido.jugador2HistoricoPartidos.length - index) < 10) {
                contRachaJugador2++;
                //contar partidas ganadas
                if (
                  partidoJugadorRegistrado.partido.jugador2.nombre ===
                  jugador2HistoricoPartido.ganador
                ) {
                  contPartidoGanadoRachaJugador2++;
                }
              }
              partidoJugadorRegistrado.partido.rachaJugador2 =
                contPartidoGanadoRachaJugador2 +' de '+contRachaJugador2;
            }
          );

          //Racha ultimos 10 partidos
          /* partidoJugadorRegistrado.partido.jugador1HistoricoPartidos
          let jugador1RachaHistoricoPartidos= partidoJugadorRegistrado.partido.jugador1HistoricoPartidos.slice(1).slice(-10);
          let jugador2RachaHistoricoPartidos= partidoJugadorRegistrado.partido.jugador2HistoricoPartidos.slice(1).slice(-10);*/

          let jugador1HistoricoPartidosAgrupados: any = this.agrupar.transform(
            partidoJugadorRegistrado.partido.jugador1HistoricoPartidos,
            'tipoPista'
          );
          let jugador2HistoricoPartidosAgrupados: any = this.agrupar.transform(
            partidoJugadorRegistrado.partido.jugador2HistoricoPartidos,
            'tipoPista'
          );
          //jugador 1
          jugador1HistoricoPartidosAgrupados.forEach((partidoPista) => {
            let contPartidoGanadoTipoPista = 0;
            // console.log(jugador1HistoricoPartidosAgrupados);
            //Por cada tipo de pista
            partidoPista.value.forEach((jugador1HistoricoPartidoAgrupado) => {
              //contar partidas ganadas
              if (
                partidoJugadorRegistrado.partido.jugador1.nombre ===
                jugador1HistoricoPartidoAgrupado.ganador
              ) {
                contPartidoGanadoTipoPista++;
              }
            });
            partidoPista.totalPartidosGanados =
              contPartidoGanadoTipoPista +' de '+ partidoPista.value.length;
          });
          //Jugador2
          jugador2HistoricoPartidosAgrupados.forEach((partidoPista) => {
            let contPartidoGanadoTipoPista = 0;
            // console.log(jugador1HistoricoPartidosAgrupados);
            //Por cada tipo de pista
            partidoPista.value.forEach((jugador2HistoricoPartidoAgrupado) => {
              //contar partidas ganadas
              if (
                partidoJugadorRegistrado.partido.jugador2.nombre ===
                jugador2HistoricoPartidoAgrupado.ganador
              ) {
                contPartidoGanadoTipoPista++;
              }
            });
            partidoPista.totalPartidosGanados =
              contPartidoGanadoTipoPista +" de "+ partidoPista.value.length;
          });
          partidoJugadorRegistrado.partido.jugador1HistoricoPartidosAgrupados =
            jugador1HistoricoPartidosAgrupados;
          partidoJugadorRegistrado.partido.jugador2HistoricoPartidosAgrupados =
            jugador2HistoricoPartidosAgrupados;

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
