import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HistoricoPartido } from '../../models/estrategias/historico-partido.model';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';

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

  cargarHistoricoPartidos(estrategia:Estrategia) {
    const url = `${base_url}/historico-partidos`;
    return this.http.post(url, estrategia, this.headers)
      .pipe(
        map((resp: { ok: boolean; historicoPartidos: HistoricoPartido[] }) => resp.historicoPartidos)
      );
  }

  aprenderCompatibilidades(estrategia:Estrategia) {
    const url = `${base_url}/historico-partidos/aprender-compatibilidades/${estrategia.compatibilidadesPlanetarias._id}`;
    return this.http.put(url, estrategia, this.headers)
      .pipe(
        map((resp: { ok: boolean; historicoPartidos: HistoricoPartido[] }) => resp.historicoPartidos)
      );
  }


}
