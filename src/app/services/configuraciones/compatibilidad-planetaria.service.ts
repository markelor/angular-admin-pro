import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CompatibilidadPlanetaria } from '../../models/configuraciones/compatibilidad-planetaria.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CompatibilidadPlanetariaService {
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

  cargarCompatibilidadesPlanetarias() {
    const url = `${base_url}/config-compatibilidades-planetarias`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; compatibilidadesPlanetarias: CompatibilidadPlanetaria[] }) => resp.compatibilidadesPlanetarias)
      );
  }

  obtenerCompatibilidadPlanetariaPorId(id: string) {
    const url = `${base_url}/config-compatibilidades-planetarias/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; compatibilidadPlanetaria: CompatibilidadPlanetaria }) => resp.compatibilidadPlanetaria));
  }

  crearCompatibilidadPlanetaria(compatibilidadPlanetaria: CompatibilidadPlanetaria) {
    const url = `${base_url}/config-compatibilidades-planetarias`;
    return this.http.post(url, compatibilidadPlanetaria, this.headers);
  }

  actualizarCompatibilidadPlanetaria(compatibilidadPlanetaria: CompatibilidadPlanetaria) {
    const url = `${base_url}/config-compatibilidades-planetarias/${compatibilidadPlanetaria._id}`;
    return this.http.put(url, compatibilidadPlanetaria, this.headers);
  }

  borrarCompatibilidadPlanetaria(_id: string) {
    const url = `${base_url}/config-compatibilidades-planetarias/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
