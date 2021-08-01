import { Deporte } from './deporte.model';

interface _JugadorUser {
    _id: string;
    nombre: string;
    img: string;

}


export class Jugador {

    constructor(
        public nombre: string,
        public ciudad:string,
        public latitud:number,
        public longitud:number,
        public fechaNacimiento:string,
        public fiabilidad:string,
        public comprobado:string,
        public nacion?:string,
        public tiempo?:string,
        public tiempoUniversal?:string,
        public _id?: string,
        public img?: string,
        public usuario?: _JugadorUser,
        public deporte?: Deporte
    ) {}

}


