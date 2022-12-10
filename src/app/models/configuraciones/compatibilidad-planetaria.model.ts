import { Estrategia } from "./estrategia.model";

interface _CompatibilidadPlanetariaUser {
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

export class CompatibilidadPlanetaria {
  constructor(
    public nombre: string,
    public descripcion: string,
    public configArmonias: _ConfigArmonia[],
    public _id?: string,
    public usuario?: _CompatibilidadPlanetariaUser
  ) {}
}
export interface AprenderCompatibilidades {
  estrategia:Estrategia,
  cicloDesde: number;
  cicloHasta: number;
  intervalo: number;
  repeticiones: number;
}
