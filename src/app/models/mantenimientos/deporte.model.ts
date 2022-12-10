interface _DeporteUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Deporte {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _DeporteUser
    ) {}

}

