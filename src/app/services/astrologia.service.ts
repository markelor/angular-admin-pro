import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Jugador } from '../models/mantenimientos/jugador.model';
import { _HistoricoJugador } from '../models/historico-jugador.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AstrologiaService {
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

  /**
   * LLamada para obtener la carta natal de un jugador
   * @param maximosMinimos
   * @param symbolo
   * @param periodo
   * @param planeta
   */

  public cargarCartaNatal(
    jugador:Jugador
  ): Observable<_HistoricoJugador> {
    const url = `${base_url}/astrologia/carta-natal`;

    return this.http
      .post<_HistoricoJugador>(url,{ jugador }, this.headers)
      .pipe(
        map((res: _HistoricoJugador) => {
          return res;
        })
      );
  }
}
