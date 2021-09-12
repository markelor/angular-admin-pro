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
            /* console.log('---------------------------------------');
            console.log(acierto);
            console.log('++++++++++++++++++++++++++++++++++++++++');*/


          }
        );
        console.log('----------------------------------');
        console.log('acierto', acierto),
        console.log('fallo', fallo);
        console.log('empate', empate);
        console.log(arrayFallo);
        //arrayAcierto.forEach((element, index) => {
/* console.log('*************************************ACIERTO*********************************')
    console.log('-------NATAL JUGADOR1------'+index);
    console.log(element.jugador1Natal.relacionesPlanetarias);
    console.log('-------TRANSITOS JUGADOR1------'+index);
    console.log(element.jugador1Transitos.relacionesPlanetarias);
    console.log('-------JUGADOR1 PUNTOS------'+index)
    console.log(element.partido.jugador1Puntos);
    console.log('-------NATAL JUGADOR2------'+index);
    console.log(element.jugador2Natal.relacionesPlanetarias);
    console.log('-------TRANSITOS JUGADOR2------'+index);
    console.log(element.jugador2Transitos.relacionesPlanetarias);
    console.log('-------JUGADOR2 PUNTOS------'+index)
    console.log(element.partido.jugador2Puntos);
    console.log('-------JUGADOR1------'+index)
    console.log(element.partido.jugador1.nombre);
    console.log('-------JUGADOR2------'+index)
    console.log(element.partido.jugador2.nombre);
    console.log('-------RESULTADO------'+index)
    console.log(element.partido.resultado);
    console.log('-------GANADOR------'+index)
    console.log(element.partido.ganador);*/
/*  });
        arrayFallo.forEach((element, index) => {
          /* console.log('*************************************FALLO*********************************')
    console.log('-------NATAL JUGADOR1------'+index);
    console.log(element.jugador1Natal.relacionesPlanetarias);
    console.log('-------TRANSITOS JUGADOR1------'+index);
    console.log(element.jugador1Transitos.relacionesPlanetarias);
    console.log('-------JUGADOR1 PUNTOS------'+index)
    console.log(element.partido.jugador1Puntos);
    console.log('-------NATAL JUGADOR2------'+index);
    console.log(element.jugador2Natal.relacionesPlanetarias);
    console.log('-------TRANSITOS JUGADOR2------'+index);
    console.log(element.jugador2Transitos.relacionesPlanetarias);
    console.log('-------JUGADOR2 PUNTOS------'+index)
    console.log(element.partido.jugador2Puntos);
    console.log('-------JUGADOR1------'+index)
    console.log(element.partido.jugador1.nombre);
    console.log('-------JUGADOR2------'+index)
    console.log(element.partido.jugador2.nombre);
    console.log('-------RESULTADO------'+index)
    console.log(element.partido.resultado);
    console.log('-------GANADOR------'+index)
    console.log(element.partido.ganador);*/

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
