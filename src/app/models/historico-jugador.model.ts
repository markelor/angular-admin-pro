import { Partido } from './mantenimientos/partido.model';
import { _PlanetasPuntos } from './planetas-puntos.model';
import { _AspectoPuntos } from './aspecto-puntos.model';
export interface _HistoricoJugador {
  planetasNatal: _PlanetasPuntos;
  aspectosNatal:_AspectoPuntos;
  transitos:{
    partido: Partido;
    planetasPartida: _PlanetasPuntos;
    aspectosPartida: _AspectoPuntos;
  }[]
}



