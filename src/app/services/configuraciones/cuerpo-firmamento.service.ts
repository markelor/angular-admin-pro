import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CuerpoFirmamento} from '../../models/configuraciones/cuerpo-firmamento.model'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CuerpoFirmamentoService {
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

  cargarCuerposFirmamento() {
    const url = `${base_url}/config-cuerpos-firmamento`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; cuerposFirmamento: CuerpoFirmamento[] }) => resp.cuerposFirmamento)
      );
  }

  obtenerCuerpoFirmamentoPorId(id: string) {
    const url = `${base_url}/config-cuerpos-firmamento/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; cuerpoFirmamento: CuerpoFirmamento}) => resp.cuerpoFirmamento));
  }

  crearCuerpoFirmamento(cuerpoFirmamento: CuerpoFirmamento) {
    const url = `${base_url}/config-cuerpos-firmamento`;
    return this.http.post(url, cuerpoFirmamento, this.headers);
  }

  actualizarCuerpoFirmamento(cuerpoFirmamento: CuerpoFirmamento) {
    const url = `${base_url}/config-cuerpos-firmamento/${cuerpoFirmamento._id}`;
    return this.http.put(url, cuerpoFirmamento, this.headers);
  }

  borrarCuerpoFirmamento(_id: string) {
    const url = `${base_url}/config-cuerpos-firmamento/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
