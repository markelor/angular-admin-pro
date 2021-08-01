import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Deporte } from '../../../models/deporte.model';
import { Partido } from '../../../models/partido.model';

import { DeporteService } from '../../../services/deporte.service';
import { PartidoService } from '../../../services/partido.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styles: [],
})
export class PartidoComponent implements OnInit {
  public partidoForm: FormGroup;
  public deportes: Deporte[] = [];
  public fiabilidadCarta: string[] = [
    'Exacto',
    'Fiable',
    'Dudoso',
    'Aleatorio',
  ];
  public partidoSeleccionado: Partido;
  public deporteSeleccionado: Deporte;
  constructor(
    private fb: FormBuilder,
    private deporteService: DeporteService,
    private partidoService: PartidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPartido(id));

    this.partidoForm = this.fb.group({
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
    });

    this.cargarDeportes();

    this.partidoForm.get('deporte').valueChanges.subscribe((deporteId) => {
      this.deporteSeleccionado = this.deportes.find((h) => h._id === deporteId);
    });
  }

  cargarPartido(id: string) {
   /* if (id === 'nuevo') {
      return;
    }

    this.partidoService
      .obtenerPartidoPorId(id)
      .pipe(delay(100))
      .subscribe((partido) => {
        if (!partido) {
          return this.router.navigateByUrl(`/dashboard/partidos`);
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
        } = partido;
        this.partidoSeleccionado = partido;
        this.partidoForm.patchValue({
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
        });
      });*/
  }

  cargarDeportes() {
    this.deporteService.cargarDeportes().subscribe((deportes: Deporte[]) => {
      this.deportes = deportes;
    });
  }

  /*guardarPartido() {
    const { nombre } = this.partidoForm.value;

    if (this.partidoSeleccionado) {
      // actualizar
      const data = {
        ...this.partidoForm.value,
        _id: this.partidoSeleccionado._id,
      };
      this.partidoService.actualizarPartido(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      console.log(this.partidoForm);
      this.partidoService
        .crearPartido(this.partidoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/partido/${resp.partido._id}`);
        });
    }
  }*/
}
