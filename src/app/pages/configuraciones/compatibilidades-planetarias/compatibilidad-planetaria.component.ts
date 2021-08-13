import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CompatibilidadPlanetariaService } from '../../../services/configuraciones/compatibilidad-planetaria.service';
import { delay } from 'rxjs/operators';
import {
  CompatibilidadPlanetaria
} from 'src/app/models/configuraciones/compatibilidad-planetaria.model';
import { _ConfigArmonia } from 'src/app/models/configuraciones/compatibilidad-planetaria.model';
@Component({
  selector: 'app-compatibilidad-planetaria',
  templateUrl: './compatibilidad-planetaria.component.html',
})
export class CompatibilidadPlanetariaComponent implements OnInit {
  public compatibilidadPlanetariaForm: FormGroup;
  public compatibilidadPlanetariaSeleccionado: CompatibilidadPlanetaria;
  constructor(
    private fb: FormBuilder,
    private compatibilidadPlanetariaService: CompatibilidadPlanetariaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  cuerposCelestes: string[] = [
    'Conjuncion',
    'Sextil',
    'Cuadratura',
    'Oposicion',
    'Trigono',
  ];

  ngOnInit(): void {
    this.compatibilidadPlanetariaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      configArmonias: new FormArray([this.crearConfigArmoniaGrupo()]),
    });
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarCompatibilidadPlanetaria(id)
    );
  }

  /**
   * Crear grupo para añadir al form array de configArmonias
   */

  private crearConfigArmoniaGrupo() {
    return new FormGroup({
      cuerpoCeleste1: new FormControl('', Validators.required),
      cuerpoCeleste2: new FormControl('', Validators.required),
      armonia: new FormControl(null, Validators.required),
      puntos: new FormControl(null, Validators.required),
    });
  }

  /**
   * Obtener el form array de configArmonias
   */
  getConfigArmonias(form) {
    return form.controls.configArmonias.controls;
  }

  /**
   * Añadir nuevo grupo config armonia al form array de configArmonias
   */
  anadirConfigArmonia() {
    const control = <FormArray>(
      this.compatibilidadPlanetariaForm.get('configArmonias')
    );
    control.push(this.crearConfigArmoniaGrupo());
  }


  /**
   * Borrar el grupo config armonia seleccionado del form array configArmonias
   */
  borrarConfigArmonia(index) {
    const control = <FormArray>(
      this.compatibilidadPlanetariaForm.get('configArmonias')
    );
    control.removeAt(index);
  }

  cargarCompatibilidadPlanetaria(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.compatibilidadPlanetariaService
      .obtenerCompatibilidadPlanetariaPorId(id)
      .pipe(delay(100))
      .subscribe((compatibilidadPlanetaria) => {
        if (!compatibilidadPlanetaria) {
          return this.router.navigateByUrl(`/dashboard/compatibilidad-planetaria`);
        }

        const { nombre, descripcion, configArmonias } = compatibilidadPlanetaria;
        this.compatibilidadPlanetariaSeleccionado = compatibilidadPlanetaria;
        this.compatibilidadPlanetariaForm.patchValue({
          nombre,
          descripcion,
          configArmonias,
        });
      });
  }

  guardarCompatibilidadPlanetaria() {
    console.log(this.compatibilidadPlanetariaForm.value);
    const { nombre } = this.compatibilidadPlanetariaForm.value;

    if (this.compatibilidadPlanetariaSeleccionado) {
      // actualizar
      const data = {
        ...this.compatibilidadPlanetariaForm.value,
        _id: this.compatibilidadPlanetariaSeleccionado._id,
      };
      this.compatibilidadPlanetariaService
        .actualizarCompatibilidadPlanetaria(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${nombre} actualizado correctamente`,
            'success'
          );
        });
    } else {
      // crear
      console.log(this.compatibilidadPlanetariaForm);
      this.compatibilidadPlanetariaService
        .crearCompatibilidadPlanetaria(this.compatibilidadPlanetariaForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(
            `/dashboard/compatibilidad-planetaria/${resp.compatibilidadPlanetaria._id}`
          );
        });
    }
  }
}