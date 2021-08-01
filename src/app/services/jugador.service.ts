import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Jugador } from '../models/jugador.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
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

  cargarJugadoresRegistrados() {
    const url = `${base_url}/jugadores/registrados`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; jugadoresRegistrados: Jugador[] }) => resp.jugadoresRegistrados)
      );
  }
  cargarJugadoresNoRegistrados() {
    const url = `${base_url}/jugadores/no-registrados`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; jugadoresNoRegistrados: Jugador[] }) => resp.jugadoresNoRegistrados)
      );
  }

  obtenerJugadorPorId(id: string) {
    const url = `${base_url}/jugadores/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; jugador: Jugador }) => resp.jugador));
  }

  crearJugador(jugador: { nombre: string; deporte: string }) {
    const url = `${base_url}/jugadores`;
    console.log(this.headers)
    console.log(jugador);
    return this.http.post(url, jugador, this.headers);
  }

  actualizarJugador(jugador: Jugador) {
    const url = `${base_url}/jugadores/${jugador._id}`;
    return this.http.put(url, jugador, this.headers);
  }

  borrarJugador(_id: string) {
    const url = `${base_url}/jugadores/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
