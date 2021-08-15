import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../../models/mantenimientos/usuario.model';
import { Deporte } from '../../models/mantenimientos/deporte.model';
import { Jugador } from '../../models/mantenimientos/jugador.model';
import { RelacionPlanetaria } from '../../models/configuraciones/relacion-planetaria.model';

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
  private transformarRelacionesPlanetarias(resultados: any[]): RelacionPlanetaria[] {
    return resultados;
  }

  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  buscar(
    tipo: 'usuarios' | 'deportes' | 'jugadores' | 'relaciones-planetarias' |'compatibilidades-planetarias'|'cuerpos-celestes',
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

            case 'relaciones-planetarias':
              return this.transformarRelacionesPlanetarias(resp.resultados);

            default:
              return [];
          }
        })
      );
  }
}
