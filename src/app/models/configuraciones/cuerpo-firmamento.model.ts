import { CuerpoCeleste } from '../mantenimientos/cuerpo-celeste.model'

interface _CuerpoFirmamentoUser {
  _id: string;
  nombre: string;
  img: string;
}

export interface _ConfigArmonia {
  planeta1: string;
  planeta2: string;
  armonia: string;
  puntos:number
}

export class CuerpoFirmamento {
  constructor(
    public nombre: string,
    public descripcion: string,
    public configCuerposCelestes: CuerpoCeleste[],
    public _id?: string,
    public usuario?: _CuerpoFirmamentoUser
  ) {}
}

