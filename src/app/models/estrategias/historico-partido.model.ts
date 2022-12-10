interface _HistoricoPartidoUser {
  _id: string;
  nombre: string;
  img: string;
}


export class HistoricoPartido {
  constructor(
    public nombre: string,
    public descripcion: string,
    public cuerposFirmamentoNatal: string,
    public cuerposFirmamentoTransitos: string,
    public compatibilidadPlanetaria: string,
    public relacionPlanetaria: string,
    public _id?: string,
    public usuario?: _HistoricoPartidoUser
  ) {}
}
