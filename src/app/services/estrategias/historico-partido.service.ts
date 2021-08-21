import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HistoricoPartido } from '../../models/estrategias/historico-partido.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HistoricoPartidoService {
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

  cargarHistoricoPartidos() {
    const url = `${base_url}/historico-partidos`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; historicoPartidos: HistoricoPartido[] }) => resp.historicoPartidos)
      );
  }

  obtenerHistoricoPartidoPorId(id: string) {
    const url = `${base_url}/historico-partidos/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; historicoPartido: HistoricoPartido }) => resp.historicoPartido));
  }

  crearHistoricoPartido(historicoPartido: HistoricoPartido) {
    const url = `${base_url}/historico-partidos`;
    return this.http.post(url, historicoPartido, this.headers);
  }

  actualizarHistoricoPartido(historicoPartido: HistoricoPartido) {
    const url = `${base_url}/historico-partidos/${historicoPartido._id}`;
    return this.http.put(url, historicoPartido, this.headers);
  }

  borrarHistoricoPartido(_id: string) {
    const url = `${base_url}/historico-partidos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
