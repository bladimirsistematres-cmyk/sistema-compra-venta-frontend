import { Usuario } from "./usuario.interface"

export interface TokenResponse{
    token: string
    usuario: Usuario
}