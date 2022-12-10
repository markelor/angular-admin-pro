import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Deporte } from '../../models/mantenimientos/deporte.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DeporteService {
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

  cargarDeportes() {
    const url = `${base_url}/deportes`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; deportes: Deporte[] }) => resp.deportes));
  }

  crearDeporte(nombre: string) {
    const url = `${base_url}/deportes`;
    return this.http.post(url, { nombre }, this.headers);
  }

  actualizarDeporte(_id: string, nombre: string) {
    const url = `${base_url}/deportes/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  borrarDeporte(_id: string) {
    const url = `${base_url}/deportes/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
