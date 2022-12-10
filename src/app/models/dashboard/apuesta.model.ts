import { _Planeta } from '../planeta.model';
import { _AspectoPuntos } from '../aspecto-puntos.model';
import { _PartidoHoy} from './partido-hoy.model';
export interface _Apuesta {
  jugador1Natal: {
    planetasNatal: {
      cuerpoCeleste: _Planeta;
    }[];
    relacionesPlanetarias: {
      aspectos: _AspectoPuntos;
      totalPuntosAspectos: number;
      totalPuntosCompatibilidad: number;
    };
  };
  jugador1Transitos: {
    planetasPartido: {
      cuerpoCeleste: _Planeta;
    }[];
    relacionesPlanetarias: {
      aspectos: _AspectoPuntos;
      totalPuntosAspectos: number;
      totalPuntosCompatibilidad: number;
    };
  };
  jugador2Natal: {
    planetasNatal: {
      cuerpoCeleste: _Planeta;
    }[];
    relacionesPlanetarias: {
      aspectos: _AspectoPuntos;
      totalPuntosAspectos: number;
      totalPuntosCompatibilidad: number;
    };
  };
  jugador2Transitos: {
    planetasPartido: {
      cuerpoCeleste: _Planeta;
    }[];
    relacionesPlanetarias: {
      aspectos: _AspectoPuntos;
      totalPuntosAspectos: number;
      totalPuntosCompatibilidad: number;
    };
  };
  partido:_PartidoHoy;

}
