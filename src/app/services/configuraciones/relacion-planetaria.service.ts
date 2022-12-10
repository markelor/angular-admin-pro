import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { RelacionPlanetaria } from '../../models/configuraciones/relacion-planetaria.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class RelacionPlanetariaService {
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

  cargarRelacionesPlanetarias() {
    const url = `${base_url}/config-relaciones-planetarias`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; relacionesPlanetarias: RelacionPlanetaria[] }) => resp.relacionesPlanetarias)
      );
  }

  obtenerRelacionPlanetariaPorId(id: string) {
    const url = `${base_url}/config-relaciones-planetarias/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; relacionPlanetaria: RelacionPlanetaria }) => resp.relacionPlanetaria));
  }

  crearRelacionPlanetaria(relacionPlanetaria: RelacionPlanetaria) {
    const url = `${base_url}/config-relaciones-planetarias`;
    return this.http.post(url, relacionPlanetaria, this.headers);
  }

  actualizarRelacionPlanetaria(relacionPlanetaria: RelacionPlanetaria) {
    const url = `${base_url}/config-relaciones-planetarias/${relacionPlanetaria._id}`;
    return this.http.put(url, relacionPlanetaria, this.headers);
  }

  borrarRelacionPlanetaria(_id: string) {
    const url = `${base_url}/config-relaciones-planetarias/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
