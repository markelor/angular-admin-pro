interface _AspectoUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Aspecto {
  constructor(
    public nombre: string,
    public gradoAspecto: number,
    public orbe: number,
    public puntosPorGrado: number,
    public _id?: string,
    public usuario?: _AspectoUser
  ) {}
}
