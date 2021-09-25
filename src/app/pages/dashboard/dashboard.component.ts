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
import { _Apuesta } from 'src/app/models/dashboard/apuesta.model';
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
      .subscribe((partidosJugadoresRegistrados:_Apuesta[]) => {
        console.log(partidosJugadoresRegistrados);
        this.cargando = false;
        partidosJugadoresRegistrados.forEach((partidoJugadorRegistrado) => {
          //Racha ultimos 10 partidos de cada jugador
          let contPartidoGanadoRachaJugador1 = 0;
          let rachaPartidosJugadosJugador1 = 0;
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

              if (
                partidoJugadorRegistrado.partido.jugador1HistoricoPartidos
                  .length -
                  index <=
                10
              ) {
                rachaPartidosJugadosJugador1++;
                //contar partidas ganadas
                console.log(partidoJugadorRegistrado.partido.jugador1.nombre);
                console.log(jugador1HistoricoPartido.ganador);
                if (
                  partidoJugadorRegistrado.partido.jugador1.nombre ===
                  jugador1HistoricoPartido.ganador
                ) {
                  contPartidoGanadoRachaJugador1++;
                }
              }
              partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador1 =
                contPartidoGanadoRachaJugador1;
              partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador1 =
                rachaPartidosJugadosJugador1;
            }
          );
          let contPartidoGanadoRachaJugador2 = 0;
          let rachaPartidosJugadosJugador2 = 0;

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
              if (
                partidoJugadorRegistrado.partido.jugador2HistoricoPartidos
                  .length -
                  index <=
                10
              ) {
                rachaPartidosJugadosJugador2++;
                //contar partidas ganadas
                if (
                  partidoJugadorRegistrado.partido.jugador2.nombre ===
                  jugador2HistoricoPartido.ganador
                ) {
                  contPartidoGanadoRachaJugador2++;
                }
              }
              partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador2 =
                contPartidoGanadoRachaJugador2;
              partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2 =
                rachaPartidosJugadosJugador2;
            }
          );
          //Cuota racha
          partidoJugadorRegistrado.partido.cuotaRachaJugador1 = (
            (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador1 +
              partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2) /
            (partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador1 +
              (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2 -
                partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador2))).toFixed(2);;
          partidoJugadorRegistrado.partido.cuotaRachaJugador2 =(
            (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2 +
              partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador1) /
            (partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador2 +
              (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador1 -
                partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador1))).toFixed(2);;

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
            partidoPista.totalPartidosGanadosJugador1 =
              contPartidoGanadoTipoPista;
            partidoPista.totalPartidosJugadosJugador1 =
              partidoPista.value.length;
          });
          //Jugador2
          jugador2HistoricoPartidosAgrupados.forEach((partidoPista) => {
            let contPartidoGanadoTipoPista = 0;
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
            partidoPista.totalPartidosGanadosJugador2 =
            contPartidoGanadoTipoPista;
          partidoPista.totalPartidosJugadosJugador2 =
            partidoPista.value.length;

           /* partidoPista.totalPartidosGanados =
              contPartidoGanadoTipoPista + ' de ' + partidoPista.value.length;*/
          });
          //calcular cuota por pista
          //jugador 1
          jugador1HistoricoPartidosAgrupados.forEach((partidoPistaJugador1) => {
            //Jugador2
            /*jugador2HistoricoPartidosAgrupados.forEach(
              (partidoPistaJugador2) => {
                if(partidoPistaJugador1===partidoPistaJugador2){
                  partidoJugadorRegistrado.partido.cuotaRachaJugador1 =
                  (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador1 +
                    partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2) /
                  (partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador1 +
                    (partidoJugadorRegistrado.partido.rachaPartidosJugadosJugador2 -
                      partidoJugadorRegistrado.partido.rachaPartidosGanadosJugador2));

                }

              }
            );*/
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
        console.log(this.partidosJugadoresRegistrados);
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
