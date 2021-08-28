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
import { EstrategiaService } from '../../../services/configuraciones/estrategia.service';
import { delay } from 'rxjs/operators';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';

import { CuerpoFirmamentoService } from '../../../services/configuraciones/cuerpo-firmamento.service';
import { CompatibilidadPlanetariaService } from '../../../services/configuraciones/compatibilidad-planetaria.service';
import { RelacionPlanetariaService } from '../../../services/configuraciones/relacion-planetaria.service';
import { CompatibilidadPlanetaria } from '../../../models/configuraciones/compatibilidad-planetaria.model';
import { CuerpoFirmamento } from '../../../models/configuraciones/cuerpo-firmamento.model';
import { RelacionPlanetaria } from '../../../models/configuraciones/relacion-planetaria.model';
@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
})
export class EstrategiaComponent implements OnInit {
  public estrategiaForm: FormGroup;
  public estrategiaSeleccionado: Estrategia;
  constructor(
    private fb: FormBuilder,
    private estrategiaService: EstrategiaService,
    private cuerpoFirmamentoService: CuerpoFirmamentoService,
    private compatibilidadPlanetariaService: CompatibilidadPlanetariaService,
    private relacionPlanetariaService: RelacionPlanetariaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  public compatibilidadesPlanetarias: CompatibilidadPlanetaria[] = [];
  public cuerposFirmamento: CuerpoFirmamento[] = [];
  public relacionesPlanetarias: RelacionPlanetaria[] = [];
  ngOnInit(): void {
    this.estrategiaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      cuerposFirmamentoNatal: new FormControl('', Validators.required),
      cuerposFirmamentoTransitos: new FormControl('', Validators.required),
      compatibilidadesPlanetarias: new FormControl('', Validators.required),
      relacionesPlanetarias: new FormControl('', Validators.required),
    });
    this.cargarCuerposFirmamento();
    this.cargarCompatibilidadesPlanetarias();
    this.cargarRelacionesPlanetarias();
    this.activatedRoute.params.subscribe(({ id }) => this.cargarEstrategia(id));
  }
  /**
   * Cargar configuración de cuerpos firmamento
   */
  private cargarCuerposFirmamento() {
    this.cuerpoFirmamentoService
      .cargarCuerposFirmamento()
      .pipe(delay(100))
      .subscribe((cuerposFirmamento) => {
        this.cuerposFirmamento = cuerposFirmamento;
      });
  }
  /**
   * Cargar configuración de compatibilidades planetarias
   */
  private cargarCompatibilidadesPlanetarias() {
    this.compatibilidadPlanetariaService
      .cargarCompatibilidadesPlanetarias()
      .pipe(delay(100))
      .subscribe((compatibilidadesPlanetarias) => {
        this.compatibilidadesPlanetarias = compatibilidadesPlanetarias;
      });
  }
  /**
   * Cargar configuración de relaciones planetarias
   */
  private cargarRelacionesPlanetarias() {
    this.relacionPlanetariaService
      .cargarRelacionesPlanetarias()
      .pipe(delay(100))
      .subscribe((relacionesPlanetarias) => {
        this.relacionesPlanetarias = relacionesPlanetarias;
      });
  }

  /**
   * Cargar compatibilidad planetaria
   */
  cargarEstrategia(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.estrategiaService
      .obtenerEstrategiaPorId(id)
      .pipe(delay(100))
      .subscribe((estrategia) => {
        if (!estrategia) {
          return this.router.navigateByUrl(`/configuraciones/estrategias`);
        }

        const {
          nombre,
          descripcion,
          cuerposFirmamentoNatal,
          cuerposFirmamentoTransitos,
          compatibilidadesPlanetarias,
          relacionesPlanetarias,
        } = estrategia;
        this.estrategiaSeleccionado = estrategia;

        this.estrategiaForm.patchValue({
          nombre,
          descripcion,
          cuerposFirmamentoNatal,
          cuerposFirmamentoTransitos,
          compatibilidadesPlanetarias,
          relacionesPlanetarias,
        });
      });
  }
  /**
   * Guardar compatibilidad planetaria
   */

  guardarEstrategia() {
    console.log(this.estrategiaForm.value);
    const { nombre } = this.estrategiaForm.value;

    if (this.estrategiaSeleccionado) {
      // actualizar
      const data = {
        ...this.estrategiaForm.value,
        _id: this.estrategiaSeleccionado._id,
      };
      this.estrategiaService.actualizarEstrategia(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      console.log(this.estrategiaForm);
      this.estrategiaService
        .crearEstrategia(this.estrategiaForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(
            `/configuraciones/estrategias/${resp.Estrategia._id}`
          );
        });
    }
  }
}
