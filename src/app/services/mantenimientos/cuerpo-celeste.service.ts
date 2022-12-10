import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CuerpoCeleste} from '../../models/mantenimientos/cuerpo-celeste.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CuerpoCelesteService {
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

  cargarCuerposCelestes() {
    const url = `${base_url}/cuerpos-celestes`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; cuerposCelestes: CuerpoCeleste[] }) => resp.cuerposCelestes)
      );
  }

  obtenerCuerpoCelestePorId(id: string) {
    const url = `${base_url}/cuerpos-celestes/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; cuerpoCeleste: CuerpoCeleste}) => resp.cuerpoCeleste));
  }

  crearCuerpoCeleste(cuerpoCeleste: CuerpoCeleste) {
    const url = `${base_url}/cuerpos-celestes`;
    return this.http.post(url, cuerpoCeleste, this.headers);
  }

  actualizarCuerpoCeleste(cuerpoCeleste: CuerpoCeleste) {
    const url = `${base_url}/cuerpos-celestes/${cuerpoCeleste._id}`;
    return this.http.put(url, cuerpoCeleste, this.headers);
  }

  borrarCuerpoCeleste(_id: string) {
    const url = `${base_url}/cuerpos-celestes/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
