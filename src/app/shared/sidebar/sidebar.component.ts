import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/dashboard/sidebar.service';
import { UsuarioService } from '../../services/mantenimientos/usuario.service';

import { Usuario } from '../../models/mantenimientos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    console.log(sidebarService.menu);
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}
