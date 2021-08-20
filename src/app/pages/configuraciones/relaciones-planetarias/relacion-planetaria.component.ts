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
import { RelacionPlanetariaService } from '../../../services/configuraciones/relacion-planetaria.service';
import { delay } from 'rxjs/operators';
import {
  RelacionPlanetaria,
  _Grado,
} from 'src/app/models/configuraciones/relacion-planetaria.model';
import { _ConfigAspecto } from 'src/app/models/configuraciones/relacion-planetaria.model';
@Component({
  selector: 'app-relacion-planetaria',
  templateUrl: './relacion-planetaria.component.html',
})
export class RelacionPlanetariaComponent implements OnInit {
  public relacionPlanetariaForm: FormGroup;
  public relacionPlanetariaSeleccionado: RelacionPlanetaria;
  constructor(
    private fb: FormBuilder,
    private relacionPlanetariaService: RelacionPlanetariaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  aspectos: string[] = [
    'Conjuncion',
    'Sextil',
    'Cuadratura',
    'Oposicion',
    'Trigono',
  ];

  ngOnInit(): void {
    this.relacionPlanetariaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      configAspectos: new FormArray([this.crearConfigAspectoGrupo()]),
    });
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarRelacionPlanetaria(id)
    );
  }

  /**
   * Crear grupo para añadir al form array de configAspectos
   */

  private crearConfigAspectoGrupo() {
    return new FormGroup({
      aspecto: new FormControl('', Validators.required),
      grados: new FormArray([this.crearGradoGrupo()], Validators.required),
      orbe: new FormControl(null, Validators.required),
      puntosPorGrado: new FormControl(null, Validators.required),
    });
  }
  /**
   * Crear grupo para añadir al form array de grados
   */
  private crearGradoGrupo() {
    return new FormGroup({
      grado: new FormControl(null, Validators.required),
    });
  }
  /**
   * Obtener el form array de configAspectos
   */
  getConfigAspectos(form) {
    return form.controls.configAspectos.controls;
  }
  /**
   * Obtener el form array de grados
   */
  getGrados(form) {
    return form.controls.grados.controls;
  }
  /**
   * Añadir nuevo grupo config aspecto al form array de configAspectos
   */
  anadirConfigAspecto() {
    const control = <FormArray>(
      this.relacionPlanetariaForm.get('configAspectos')
    );
    control.push(this.crearConfigAspectoGrupo());
  }
  /**
   * Añadir nuevo grupo grado al form array de grados
   */
  anadirGrado(i: number) {
    const control = <FormArray>(
      this.relacionPlanetariaForm
        .get('configAspectos')
        ['controls'][i].get('grados')
    );
    control.push(this.crearGradoGrupo());
  }

  /**
   * Borrar el grupo config aspecto seleccionado del form array configAspectos
   */
  borrarConfigAspecto(index) {
    const control = <FormArray>(
      this.relacionPlanetariaForm.get('configAspectos')
    );
    control.removeAt(index);
  }

  /**
   * Borrar el grupo grado seleccionado del form array grados
   */
  borrarGrado(i, j) {
    const control = <FormArray>(
      this.relacionPlanetariaForm
        .get('configAspectos')
        ['controls'][i].get('grados')
    );
    control.removeAt(j);
  }

  cargarRelacionPlanetaria(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.relacionPlanetariaService
      .obtenerRelacionPlanetariaPorId(id)
      .pipe(delay(100))
      .subscribe((relacionPlanetaria) => {
        if (!relacionPlanetaria) {
          return this.router.navigateByUrl(`/configuracion/relacion-planetaria`);
        }

        const { nombre, descripcion, configAspectos } = relacionPlanetaria;
        this.relacionPlanetariaSeleccionado = relacionPlanetaria;
        this.borrarConfigAspecto(0);
        this.relacionPlanetariaSeleccionado.configAspectos.forEach(
          (configAspecto: _ConfigAspecto, index) => {
            this.anadirConfigAspecto();
            this.borrarGrado(index,0);
            configAspecto.grados.forEach((grado: _Grado) => {
              this.anadirGrado(index);
            });
          }
        );
        this.relacionPlanetariaForm.patchValue({
          nombre,
          descripcion,
          configAspectos
        });
      });
  }

  guardarRelacionPlanetaria() {
    console.log(this.relacionPlanetariaForm.value);
    const { nombre } = this.relacionPlanetariaForm.value;

    if (this.relacionPlanetariaSeleccionado) {
      // actualizar
      const data = {
        ...this.relacionPlanetariaForm.value,
        _id: this.relacionPlanetariaSeleccionado._id,
      };
      this.relacionPlanetariaService
        .actualizarRelacionPlanetaria(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${nombre} actualizado correctamente`,
            'success'
          );
        });
    } else {
      // crear
      console.log(this.relacionPlanetariaForm);
      this.relacionPlanetariaService
        .crearRelacionPlanetaria(this.relacionPlanetariaForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(
            `/configuraciones/relacion-planetaria/${resp.relacionPlanetaria._id}`
          );
        });
    }
  }
}
