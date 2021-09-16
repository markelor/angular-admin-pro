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
    this.historicoPartidoService
      .cargarHistoricoPartidos(estrategia)
      .subscribe((historicoPartidos: any) => {

        const arrayAcierto = [];
        const arrayFallo = [];
        let acierto = 0;
        let fallo = 0;
        let empate = 0;

        historicoPartidos.historicoPartidos.forEach(
          (historicoPartido) => {
            const jugador1Puntos =
              historicoPartido.jugador1Natal.relacionesPlanetarias
                .totalPuntosAspectos +
              historicoPartido.jugador1Natal.relacionesPlanetarias
                .totalPuntosCompatibilidad +
              historicoPartido.jugador1Transitos.relacionesPlanetarias
                .totalPuntosAspectos +
              historicoPartido.jugador1Transitos.relacionesPlanetarias
                .totalPuntosCompatibilidad;
            const jugador2Puntos =
              historicoPartido.jugador2Natal.relacionesPlanetarias
                .totalPuntosAspectos +
              historicoPartido.jugador2Natal.relacionesPlanetarias
                .totalPuntosCompatibilidad +
              historicoPartido.jugador2Transitos.relacionesPlanetarias
                .totalPuntosAspectos +
              historicoPartido.jugador2Transitos.relacionesPlanetarias
                .totalPuntosCompatibilidad;
            historicoPartido.partido.jugador1Puntos = jugador1Puntos;
            historicoPartido.partido.jugador2Puntos = jugador2Puntos;
            if (
              jugador1Puntos > jugador2Puntos &&
              historicoPartido.partido.ganador ===
                historicoPartido.partido.jugador1.nombre &&
              Math.abs(jugador1Puntos - jugador2Puntos) > 60
            ) {
              arrayAcierto.push(historicoPartido);
              acierto++;
            } else if (
              jugador1Puntos < jugador2Puntos &&
              historicoPartido.partido.ganador ===
                historicoPartido.partido.jugador2.nombre &&
              Math.abs(jugador2Puntos - jugador1Puntos) > 60
            ) {
              arrayAcierto.push(historicoPartido);
              acierto++;
            } else if (
              jugador1Puntos > jugador2Puntos &&
              historicoPartido.partido.ganador ===
                historicoPartido.partido.jugador2.nombre &&
              Math.abs(jugador1Puntos - jugador2Puntos) > 60
            ) {
              arrayFallo.push(historicoPartido);
              fallo++;
            } else if (
              jugador1Puntos < jugador2Puntos &&
              historicoPartido.partido.ganador ===
                historicoPartido.partido.jugador1.nombre &&
              Math.abs(jugador2Puntos - jugador1Puntos) > 60
            ) {
              arrayFallo.push(historicoPartido);
              fallo++;
            } else {
              empate++;
            }
          }
        );
        console.log('----------------------------------');
        console.log('acierto', acierto),
        console.log('fallo', fallo);
        console.log('empate', empate);
        console.log(arrayFallo);


        this.cargando = false;
        this.historicoPartidos = historicoPartidos;

   });

}

  aprenderCompatibilidades(estrategia:Estrategia) {
    console.log(estrategia);
    this.cargando = true;
    this.historicoPartidoService
      .aprenderCompatibilidades(estrategia)
      .subscribe((historicoPartidos) => {

        console.log(historicoPartidos);
        this.cargando = false;
        this.historicoPartidos = historicoPartidos;
      });
  }
}
