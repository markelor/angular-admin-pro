import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Aspecto } from '../../../models/aspecto.model';
import { AspectoService } from '../../../services/aspecto.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-aspecto',
  templateUrl: './aspecto.component.html'
})
export class AspectoComponent implements OnInit {
  public aspectoForm: FormGroup;
  public aspectoSeleccionado: Aspecto;
  constructor(
    private fb: FormBuilder,
    private aspectoService: AspectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
    aspectos:string[] = [
  'Conjuncion','Sextil','Cuadratura','Oposicion','Trigono'
  ];
  aspectosItems: {
    aspecto: string;
    gradoAspecto: number;
    orbe: number;
    puntosPorGrado: number;
  }[] = [
    {
      aspecto: '',
      gradoAspecto: 0,
      orbe: 0,
      puntosPorGrado: 0,
    }
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarAspecto(id));

    this.aspectoForm = this.fb.group({
      aspectosArray: new FormArray([this.crearAspectoGrupo()]),
    });
  }
  private crearAspectoGrupo() {
    return new FormGroup({
      aspecto: new FormControl(),
      gradoAspecto: new FormControl(),
      orbe: new FormControl(),
      puntosPorGrado: new FormControl(),
    });
  }
  get aspectosArray() {
    return this.aspectoForm.get('aspectosArray') as FormArray;
  }
  anadirAspecto() {
    //this.aspectosItems.push(item);
    this.aspectosArray.push(this.crearAspectoGrupo());
  }
  removeItem() {
    this.aspectosItems.pop();
    this.aspectosArray.removeAt(this.aspectosArray.length - 1);
  }

  cargarAspecto(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.aspectoService
      .obtenerAspectoPorId(id)
      .pipe(delay(100))
      .subscribe((aspecto) => {
        if (!aspecto) {
          return this.router.navigateByUrl(`/dashboard/aspectos`);
        }

        const { nombre, gradoAspecto, orbe, puntosPorGrado } = aspecto;
        this.aspectoSeleccionado = aspecto;
        this.aspectoForm.patchValue({
          nombre,
          gradoAspecto,
          orbe,
          puntosPorGrado,
        });
      });
  }

  guardarAspecto() {
    const { nombre } = this.aspectoForm.value;

    if (this.aspectoSeleccionado) {
      // actualizar
      const data = {
        ...this.aspectoForm.value,
        _id: this.aspectoSeleccionado._id,
      };
      this.aspectoService.actualizarAspecto(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      console.log(this.aspectoForm);
      this.aspectoService
        .crearAspecto(this.aspectoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/aspecto/${resp.aspecto._id}`);
        });
    }
  }
}
