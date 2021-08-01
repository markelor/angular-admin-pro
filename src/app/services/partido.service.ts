import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Partido } from '../models/partido.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
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

  cargarPartidos() {
    const url = `${base_url}/partidos`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; partidos: Partido[] }) => resp.partidos)
      );
  }

  obtenerPartidoPorId(id: string) {
    const url = `${base_url}/partidos/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; partido: Partido }) => resp.partido));
  }

  crearPartidos(deporte: string) {
    const url = `${base_url}/partidos`;
    return this.http.post(url, deporte, this.headers);
  }

  /*actualizarPartido(partido: Partido) {
    const url = `${base_url}/partidos/${partido._id}`;
    return this.http.put(url, partido, this.headers);
  }*/

  borrarPartido(_id: string) {
    const url = `${base_url}/partidos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
