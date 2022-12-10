import { Jugador } from '../mantenimientos/jugador.model';
import { Partido } from '../mantenimientos/partido.model';
export class _PartidoHoy {
  categoria: string;
  circuito: number;
  cuotaRachaJugador1: string;
  cuotaRachaJugador2: string;
  cuotaTotalPista: {
    pista: string;
    cuotaTotalPistaJugador1: string;
    cuotaTotalPistaJugador2: string;
  }[];
  diferenciaPuntos: number;
  ganador: string;
  horaInicio: string;
  jugador1: Jugador;
  jugador1HistoricoPartidos: Partido[];
  jugador1HistoricoPartidosAgrupados: {
    key: string;
    totalPartidosGanadosJugador1: number;
    totalPartidosJugadosJugador1: number;
    value: Partido[];
  }[];
  jugador1Puntos: number;
  jugador2: Jugador;
  jugador2HistoricoPartidos: Partido[];
  jugador2HistoricoPartidosAgrupados: {
    key: string;
    totalPartidosGanadosJugador2: number;
    totalPartidosJugadosJugador2: number;
    value: Partido[];
  }[];
  jugador2Puntos: number;

  modalidad: string;
  rachaPartidosGanadosJugador1: number;
  rachaPartidosGanadosJugador2: number;
  rachaPartidosJugadosJugador1: number;
  rachaPartidosJugadosJugador2: number;
  resultado: string;
  tipoPista: string;
}
