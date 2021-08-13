interface _CuerpoCelesteUser {
  _id: string;
  nombre: string;
  img: string;
}


export class CuerpoCeleste {
  constructor(
    public nombre: string,
    public abreviatura: string,
    public _id?: string,
    public usuario?: _CuerpoCelesteUser
  ) {}
}
