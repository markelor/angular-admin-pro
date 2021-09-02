interface _EstrategiaUser {
  _id: string;
  nombre: string;
  img: string;
}
interface _ConfigArmonia {
  _id: string;
  armonia: string;
  cuerpoCeleste1: string;
  cuerpoCeleste2: string;
  puntos: number;
}
interface _CompatibilidadesPlanetarias {
  _id: string;
  configArmonias: _ConfigArmonia[];
  createdAt: Date;
  descripcion: string;
  nombre: string;
  updatedAt: Date;
  usuario: string;
}

export class Estrategia {
  constructor(
    public nombre: string,
    public descripcion: string,
    public cuerposFirmamentoNatal: string,
    public cuerposFirmamentoTransitos: string,
    public compatibilidadesPlanetarias: _CompatibilidadesPlanetarias,
    public relacionesPlanetarias: string,
    public _id?: string,
    public usuario?: _EstrategiaUser
  ) {}
}
