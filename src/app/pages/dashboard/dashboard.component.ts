import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';
import { HistoricoPartido } from 'src/app/models/estrategias/historico-partido.model';
import { EstrategiaService } from 'src/app/services/configuraciones/estrategia.service';
import { PartidoService } from 'src/app/services/mantenimientos/partido.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  public dtTriggerPartidosJugadoresRegistrados: Subject<any> = new Subject();
  public dtTriggerPartidosJugadoresNoRegistradoss: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {};
  public cargando: boolean = true;
  public partidosJugadoresRegistrados: HistoricoPartido[] = [];
  public estrategiaForm: FormGroup;
  public estrategias: Estrategia[] = [];
  constructor(
    private partidoService: PartidoService,
    private estrategiaService: EstrategiaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializar datos
    this.dtOptions = this.buildDtOptions();
    this.estrategiaForm = this.fb.group({
      estrategia: new FormControl('', Validators.required),
    });
    this.cargarEstrategias();
  }

  cargarEstrategias() {
    this.cargando = true;
    this.estrategiaService.cargarEstrategias().subscribe((estrategias) => {
      this.cargando = false;
      this.estrategias = estrategias;
    });
  }
  cargarPartidos(estrategia: Estrategia) {
    this.cargando = true;
    this.partidoService
      .cargarPartidosDiarios(estrategia)
      .subscribe((partidosJugadoresRegistrados: any) => {
        console.log(partidosJugadoresRegistrados);
        this.cargando = false;
        this.partidosJugadoresRegistrados = partidosJugadoresRegistrados;
        this.dtTriggerPartidosJugadoresRegistrados.next();
      });
  }
  private buildDtOptions() {
    return {
      pageLength: 10,
      dom: 'Bfrtip',
        order: [
        [9, "desc"]
      ],
      // Configure the buttons
      buttons: ['columnsToggle', 'colvis', 'copy', 'print', 'excel', 'pdf'],
      responsive: true,
      destroy: true,
    };
  }
}
