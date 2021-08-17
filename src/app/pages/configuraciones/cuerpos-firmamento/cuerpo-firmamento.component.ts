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
import { CuerpoFirmamentoService } from '../../../services/configuraciones/cuerpo-firmamento.service';
import { delay } from 'rxjs/operators';
import { CuerpoFirmamento } from 'src/app/models/configuraciones/cuerpo-firmamento.model';
import { CuerpoCelesteService } from 'src/app/services/mantenimientos/cuerpo-celeste.service';
import { CuerpoCeleste } from 'src/app/models/mantenimientos/cuerpo-celeste.model';
@Component({
  selector: 'app-cuerpo-firmamento',
  templateUrl: './cuerpo-firmamento.component.html',
})
export class CuerpoFirmamentoComponent implements OnInit {
  public cuerpoFirmamentoForm: FormGroup;
  public cuerpoFirmamentoSeleccionado: CuerpoFirmamento;
  constructor(
    private fb: FormBuilder,
    private cuerpoFirmamentoService: CuerpoFirmamentoService,
    private cuerpoCelesteService: CuerpoCelesteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  cuerposCelestes: CuerpoCeleste[] = [];
  ngOnInit(): void {
    this.cuerpoFirmamentoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      configCuerposCelestes: new FormArray([
        this.crearConfigCuerpoCelesteGrupo(),
      ]),
    });
    this.cargarCuerposCelestes();
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarCuerpoFirmamento(id)
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
   * Crear grupo para añadir al form array de configCuerposCelestes
   */

  private crearConfigCuerpoCelesteGrupo() {
    return new FormGroup({
      cuerpoCelesteId: new FormControl('', Validators.required),
    });
  }

  /**
   * Obtener el form array de configCuerposCelestes
   */
  getConfigCuerpoCeleste(form) {
    return form.controls.configCuerposCelestes.controls;
  }

  /**
   * Añadir nuevo grupo config cuerpo celeste al form array de configCuerposCelestes
   */
  anadirConfigCuerpoCeleste() {
    const control = <FormArray>(
      this.cuerpoFirmamentoForm.get('configCuerposCelestes')
    );
    control.push(this.crearConfigCuerpoCelesteGrupo());
  }


  /**
   * Borrar el grupo config cuerpo celeste seleccionado del form array configCuerposCelestes
   */
  borrarConfigCuerpoCeleste(index) {
    const control = <FormArray>(
      this.cuerpoFirmamentoForm.get('configCuerposCelestes')
    );
    control.removeAt(index);
  }

  /**
   * Cargar compatibilidad planetaria
   */
  cargarCuerpoFirmamento(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.cuerpoFirmamentoService
      .obtenerCuerpoFirmamentoPorId(id)
      .pipe(delay(100))
      .subscribe((cuerpoFirmamento) => {
        if (!cuerpoFirmamento) {
          return this.router.navigateByUrl(`/configuracion/cuerpo-firmamento`);
        }

        const {
          nombre,
          descripcion,
          configCuerposCelestes,
        } = cuerpoFirmamento;
        this.cuerpoFirmamentoSeleccionado = cuerpoFirmamento;

        this.borrarConfigCuerpoCeleste(0);
        this.cuerpoFirmamentoSeleccionado.configCuerposCelestes.forEach(
          (configCuerpoCeleste: CuerpoCeleste) => {
            this.anadirConfigCuerpoCeleste();
          }
        );

        this.cuerpoFirmamentoForm.patchValue({
          nombre,
          descripcion,
          configCuerposCelestes
        });
      });
  }
  /**
   * Guardar compatibilidad planetaria
   */

  guardarCuerpoFirmamento() {
    console.log(this.cuerpoFirmamentoForm.value);
    const { nombre } = this.cuerpoFirmamentoForm.value;

    if (this.cuerpoFirmamentoSeleccionado) {
      // actualizar
      const data = {
        ...this.cuerpoFirmamentoForm.value,
        _id: this.cuerpoFirmamentoSeleccionado._id,
      };
      this.cuerpoFirmamentoService
        .actualizarCuerpoFirmamento(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${nombre} actualizado correctamente`,
            'success'
          );
        });
    } else {
      // crear
      console.log(this.cuerpoFirmamentoForm);
      this.cuerpoFirmamentoService
        .crearCuerpoFirmamento(this.cuerpoFirmamentoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(
            `/configuracion/cuerpo-firmamento/${resp.cuerpoFirmamento._id}`
          );
        });
    }
  }
}
