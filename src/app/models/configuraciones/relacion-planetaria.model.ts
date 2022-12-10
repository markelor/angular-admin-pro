interface _RelacionPlanetariaUser {
  _id: string;
  nombre: string;
  img: string;
}
export interface _Grado {
  grado: string;
}
export interface _ConfigAspecto {
  aspecto: string;
  grados: _Grado[];
  orbe: number;
  puntosPorGrado: number;
}

export class RelacionPlanetaria {
  constructor(
    public nombre: string,
    public descripcion: string,
    public configAspectos: _ConfigAspecto[],
    public _id?: string,
    public usuario?: _RelacionPlanetariaUser
  ) {}
}
