interface _EstrategiaUser {
  _id: string;
  nombre: string;
  img: string;
}


export class Estrategia {
  constructor(
    public nombre: string,
    public descripcion: string,
    public cuerposFirmamentoNatal: string,
    public cuerposFirmamentoTransitos: string,
    public compatibilidadPlanetaria: string,
    public relacionPlanetaria: string,
    public _id?: string,
    public usuario?: _EstrategiaUser
  ) {}
}
