import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Partido } from '../../../models/mantenimientos/partido.model';

import { BusquedasService } from '../../../services/dashboard/busquedas.service';
import { PartidoService } from '../../../services/mantenimientos/partido.service';
import { ModalImagenService } from '../../../services/dashboard/modal-imagen.service';
import { DeporteService } from 'src/app/services/mantenimientos/deporte.service';
import { Deporte } from 'src/app/models/mantenimientos/deporte.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  public dtTriggerGeneral: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {};

  public cargando: boolean = true;
  public partidos: Partido[] = [];
  public deportes: Deporte[] = [];
  public partidosForm: FormGroup;
  public deporteSeleccionado: Deporte;
  constructor(
    private partidoService: PartidoService,
    private modalImagenService: ModalImagenService,
    private deporteService:DeporteService,
    private busquedasService: BusquedasService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    // Inicializar datos
    this.dtOptions = this.buildDtOptions();
    this.cargarPartidosGuardados();


    this.partidosForm = this.fb.group({
      deporte: ['', Validators.required]
    });

    this.cargarDeportes();

    this.partidosForm.get('deporte').valueChanges.subscribe((deporteId) => {
      this.deporteSeleccionado = this.deportes.find((h) => h._id === deporteId);
    });
  }
  cargarDeportes() {
    this.deporteService.cargarDeportes().subscribe((deportes: Deporte[]) => {
      this.deportes = deportes;
    });
  }

  cargarPartidosGuardados() {
    this.cargando = true;
    this.partidoService.cargarPartidosGuardados().subscribe((partidos) => {
      console.log(partidos);
      this.cargando = false;
      this.partidos = partidos;
      this.dtTriggerGeneral.next();
    });
  }
  private buildDtOptions() {
    return {
      pageLength: 10,
      dom: 'Bfrtip',
      order: [
        [1, 'desc'],
        [2, 'desc'],
      ],
      // Configure the buttons
      buttons: ['columnsToggle', 'colvis', 'copy', 'print', 'excel', 'pdf'],
      select: true,
      retrieve: true,
    };
  }

  ngOnDestroy(){
    this.dtTriggerGeneral.unsubscribe();
  }
}
