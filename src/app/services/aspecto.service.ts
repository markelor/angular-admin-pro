import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Aspecto } from '../models/aspecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AspectoService {
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

  cargarAspectos() {
    const url = `${base_url}/aspectos`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; aspectos: Aspecto[] }) => resp.aspectos)
      );
  }

  obtenerAspectoPorId(id: string) {
    const url = `${base_url}/aspectos/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; aspecto: Aspecto }) => resp.aspecto));
  }

  crearAspecto(aspecto: { nombre: string; deporte: string }) {
    const url = `${base_url}/aspectos`;
    console.log(this.headers)
    console.log(aspecto);
    return this.http.post(url, aspecto, this.headers);
  }

  actualizarAspecto(aspecto: Aspecto) {
    const url = `${base_url}/aspectos/${aspecto._id}`;
    return this.http.put(url, aspecto, this.headers);
  }

  borrarAspecto(_id: string) {
    const url = `${base_url}/aspectos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
