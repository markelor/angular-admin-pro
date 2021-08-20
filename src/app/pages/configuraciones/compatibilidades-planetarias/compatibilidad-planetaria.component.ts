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
import { CompatibilidadPlanetaria } from 'src/app/models/configuraciones/compatibilidad-planetaria.model';
import { _ConfigArmonia } from 'src/app/models/configuraciones/compatibilidad-planetaria.model';
import { CuerpoCelesteService } from 'src/app/services/mantenimientos/cuerpo-celeste.service';
import { CuerpoCeleste } from 'src/app/models/mantenimientos/cuerpo-celeste.model';
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
    private cuerpoCelesteService: CuerpoCelesteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  cuerposCelestes: CuerpoCeleste[] = [];
  armonias: string[] = ['Positivo','Negativo','Neutro'];
  ngOnInit(): void {
    this.compatibilidadPlanetariaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      configArmonias: new FormArray([this.crearConfigArmoniaGrupo()]),
    });
    this.cargarCuerposCelestes();
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarCompatibilidadPlanetaria(id)
    );
  }
  /**
   * cargar cuerpos celestes
   */
  private cargarCuerposCelestes() {
    this.cuerpoCelesteService
      .cargarCuerposCelestes()
      .pipe(delay(100))
      .subscribe((cuerposCelestes) => {
        this.cuerposCelestes = cuerposCelestes;
      });
  }

  /**
   * Crear grupo para añadir al form array de configArmonias
   */

  private crearConfigArmoniaGrupo() {
    return new FormGroup({
      cuerpoCeleste1: new FormControl('', Validators.required),
      cuerpoCeleste2: new FormControl('', Validators.required),
      armonia: new FormControl('', Validators.required),
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
  /**
   * Cargar compatibilidad planetaria
   */
  cargarCompatibilidadPlanetaria(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.compatibilidadPlanetariaService
      .obtenerCompatibilidadPlanetariaPorId(id)
      .pipe(delay(100))
      .subscribe((compatibilidadPlanetaria) => {
        if (!compatibilidadPlanetaria) {
          return this.router.navigateByUrl(
            `/configuraciones/compatibilidad-planetaria`
          );
        }

        const { nombre, descripcion, configArmonias } =
          compatibilidadPlanetaria;
        this.compatibilidadPlanetariaSeleccionado = compatibilidadPlanetaria;

        this.borrarConfigArmonia(0);
        this.compatibilidadPlanetariaSeleccionado.configArmonias.forEach(
          (configArmonia: _ConfigArmonia) => {
            this.anadirConfigArmonia();
          }
        );
        this.compatibilidadPlanetariaForm.patchValue({
          nombre,
          descripcion,
          configArmonias,
        });
      });
  }
  /**
   * Guardar compatibilidad planetaria
   */

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
            `/configuraciones/compatibilidad-planetaria/${resp.compatibilidadPlanetaria._id}`
          );
        });
    }
  }
}
