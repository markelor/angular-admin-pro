import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CuerpoCelesteService } from '../../../services/mantenimientos/cuerpo-celeste.service';
import { delay } from 'rxjs/operators';
import {
  CuerpoCeleste
} from 'src/app/models/mantenimientos/cuerpo-celeste.model';
@Component({
  selector: 'app-cuerpo-celeste',
  templateUrl: './cuerpo-celeste.component.html',
})
export class CuerpoCelesteComponent implements OnInit {
  public cuerpoCelesteForm: FormGroup;
  public cuerpoCelesteSeleccionado: CuerpoCeleste;
  constructor(
    private fb: FormBuilder,
    private cuerpoCelesteService: CuerpoCelesteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cuerpoCelesteForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      abreviatura: new FormControl('', Validators.required)
    });
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarCuerpoCeleste(id)
    );
  }

  cargarCuerpoCeleste(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.cuerpoCelesteService
      .obtenerCuerpoCelestePorId(id)
      .pipe(delay(100))
      .subscribe((cuerpoCeleste) => {
        if (!cuerpoCeleste) {
          return this.router.navigateByUrl(`/mantenimientos/cuerpo-celeste`);
        }

        const {nombre,abreviatura } = cuerpoCeleste;
        this.cuerpoCelesteSeleccionado = cuerpoCeleste;
        this.cuerpoCelesteForm.patchValue({
          nombre,
          abreviatura
        });
      });
  }

  guardarCuerpoCeleste() {
    console.log(this.cuerpoCelesteForm.value);
    const { nombre } = this.cuerpoCelesteForm.value;

    if (this.cuerpoCelesteSeleccionado) {
      // actualizar
      const data = {
        ...this.cuerpoCelesteForm.value,
        _id: this.cuerpoCelesteSeleccionado._id,
      };
      this.cuerpoCelesteService
        .actualizarCuerpoCeleste(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${nombre} actualizado correctamente`,
            'success'
          );
        });
    } else {
      // crear
      console.log(this.cuerpoCelesteForm);
      this.cuerpoCelesteService
        .crearCuerpoCeleste(this.cuerpoCelesteForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(
            `/mantenimientos/cuerpo-celeste/${resp.cuerpoCeleste._id}`
          );
        });
    }
  }
}
