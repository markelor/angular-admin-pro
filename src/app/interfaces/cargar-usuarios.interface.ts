import { Usuario } from '../models/mantenimientos/usuario.model';

export interface CargarUsuario {
    total: number;
    usuarios: Usuario[];
}
