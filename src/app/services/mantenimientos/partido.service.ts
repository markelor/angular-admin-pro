import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Partido } from '../../models/mantenimientos/partido.model';
import { _Apuesta } from '../../models/dashboard/apuesta.model';
import { Estrategia } from 'src/app/models/configuraciones/estrategia.model';

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

  cargarPartidosGuardados() {
    const url = `${base_url}/partidos`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; partidos: Partido[] }) => resp.partidos));
  }
  cargarPartidosDiarios(estrategia: Estrategia) {
    const url = `${base_url}/partidos/hoy`;
    return this.http.post(url, estrategia, this.headers).pipe(
      map((resp: { partidosPorJugar: { historicoPartidos: _Apuesta[] } }) => {
        return resp.partidosPorJugar.historicoPartidos;
      })
    );
  }
}
