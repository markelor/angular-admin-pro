export interface _AspectoPuntos {

  aspectos:{
    [aspecto: string]: {
    gradosAspecto: number;
    planetaMapa1: string;
    planetaMapa2: string;
    puntosAspecto: number;
  }[];};
  totalPuntosAspectos:number;
  totalPuntosCompatibilidad:number;
}
