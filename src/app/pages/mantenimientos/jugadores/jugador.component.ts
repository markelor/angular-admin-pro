import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Deporte } from '../../../models/mantenimientos/deporte.model';
import { Jugador } from '../../../models/mantenimientos/jugador.model';

import { DeporteService } from '../../../services/mantenimientos/deporte.service';
import { JugadorService } from '../../../services/mantenimientos/jugador.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styles: [],
})
export class JugadorComponent implements OnInit {
  public jugadorForm: FormGroup;
  public deportes: Deporte[] = [];
  public fiabilidadCarta: string[] = [
    'Exacto',
    'Fiable',
    'Dudoso',
    'Aleatorio',
  ];
  public comprobarCarta: string[] = [
    'Astrotheme',
    'No'
  ];
  public jugadorSeleccionado: Jugador;
  public deporteSeleccionado: Deporte;
  constructor(
    private fb: FormBuilder,
    private deporteService: DeporteService,
    private jugadorService: JugadorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarJugador(id));

    this.jugadorForm = this.fb.group({
      nombre: ['', Validators.required],
      deporte: ['', Validators.required],
      nacion: [''],
      ciudad: ['', Validators.required],
      latitud: [undefined, Validators.required],
      longitud: [undefined, Validators.required],
      fechaNacimiento: ['', Validators.required],
      tiempo: [''],
      tiempoUniversal: [''],
      fiabilidad: ['', Validators.required],
      comprobado: ['', Validators.required],
    });

    this.cargarDeportes();

    this.jugadorForm.get('deporte').valueChanges.subscribe((deporteId) => {
      this.deporteSeleccionado = this.deportes.find((h) => h._id === deporteId);
    });
  }

  cargarJugador(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.jugadorService
      .obtenerJugadorPorId(id)
      .pipe(delay(100))
      .subscribe((jugador) => {
        if (!jugador) {
          return this.router.navigateByUrl(`/mantenimientos/jugadores`);
        }

        const {
          nombre,
          deporte: { _id },
          nacion,
          ciudad,
          latitud,
          longitud,
          fechaNacimiento,
          tiempo,
          tiempoUniversal,
          fiabilidad,
          comprobado
        } = jugador;
        this.jugadorSeleccionado = jugador;
        this.jugadorForm.patchValue({
          nombre,
          deporte: _id,
          nacion,
          ciudad,
          latitud,
          longitud,
          fechaNacimiento,
          tiempo,
          tiempoUniversal,
          fiabilidad,
          comprobado
        });
      });
  }

  cargarDeportes() {
    this.deporteService.cargarDeportes().subscribe((deportes: Deporte[]) => {
      this.deportes = deportes;
    });
  }

  guardarJugador() {
    const { nombre } = this.jugadorForm.value;

    if (this.jugadorSeleccionado) {
      // actualizar
      const data = {
        ...this.jugadorForm.value,
        _id: this.jugadorSeleccionado._id,
      };
      this.jugadorService.actualizarJugador(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      console.log(this.jugadorForm);
      this.jugadorService
        .crearJugador(this.jugadorForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/mantenimientos/jugador/${resp.jugador._id}`);
        });
    }
  }
}
