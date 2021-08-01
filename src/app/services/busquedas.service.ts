import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Deporte } from '../models/deporte.model';
import { Jugador } from '../models/jugador.model';
import { Aspecto } from '../models/aspecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  private transformarDeportes(resultados: any[]): Deporte[] {
    return resultados;
  }

  private transformarJugadores(resultados: any[]): Jugador[] {
    return resultados;
  }
  private transformarAspectos(resultados: any[]): Aspecto[] {
    return resultados;
  }

  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  buscar(
    tipo: 'usuarios' | 'deportes' | 'jugadores' | 'aspectos',
    termino: string
  ) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http
      .get<Usuario[] | Deporte[] | Jugador[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);

            case 'deportes':
              return this.transformarDeportes(resp.resultados);

            case 'jugadores':
              return this.transformarJugadores(resp.resultados);

            case 'aspectos':
              return this.transformarAspectos(resp.resultados);

            default:
              return [];
          }
        })
      );
  }
}
