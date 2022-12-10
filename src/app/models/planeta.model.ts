export interface _Planeta {
  nombre: string;
  abreviatura: string;
  grados: number;
  signo: {
    nombre: string;
    tiempo: {
      hora: number;
      min: number;
      sec: number;
    };
    puntos: number;
  };
  casa: {
    numero: number;
    puntos: number;
  };
  retrogrado: boolean;
}
