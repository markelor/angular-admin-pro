import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Estrategia } from '../../models/configuraciones/estrategia.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class EstrategiaService {
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

  cargarEstrategias() {
    const url = `${base_url}/config-estrategias`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; estrategias: Estrategia[] }) => resp.estrategias)
      );
  }

  obtenerEstrategiaPorId(id: string) {
    const url = `${base_url}/config-estrategias/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; estrategia: Estrategia }) => resp.estrategia));
  }

  crearEstrategia(estrategia: Estrategia) {
    const url = `${base_url}/config-estrategias`;
    return this.http.post(url, estrategia, this.headers);
  }

  actualizarEstrategia(estrategia: Estrategia) {
    const url = `${base_url}/config-estrategias/${estrategia._id}`;
    return this.http.put(url, estrategia, this.headers);
  }

  borrarEstrategia(_id: string) {
    const url = `${base_url}/config-estrategias/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
