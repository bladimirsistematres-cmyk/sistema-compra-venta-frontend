import { TipoProveedor } from "./tipoProveedor.enum"

export interface ProveedorRequestDTO{
    nombreComercial: string
    identificacionFiscal: string
    correoElectronico: string
    direccion: string
    enlacePagina: string
    tipoProveedor: TipoProveedor;
    idCiudad: number
}