import { Deporte } from './deporte.model';

interface _PartidoUser {
    _id: string;
    nombre: string;
    img: string;

}

export class Partido {

    constructor(
        public categoria: string,
        public modalidad:string,
        public circuito:number,
        public tipoPista:number,
        public horaInicio:number,
        public jugador1:string,
        public jugador2:string,
        public resultado:string,
        public ganador?: string,
        public usuario?: _PartidoUser,
        public deporte?: Deporte
    ) {}

}


