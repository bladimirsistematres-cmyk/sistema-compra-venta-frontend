import { CompraDetalleResponseDTO } from "./compraDetalleResponseDTO.interface";

export interface CompraResponseDTO{
    idCompra: number;
    totalCompra: number;
    fechaCompra: string;
    IdProveedor: number;
    nombreComercial: string;
    idUsuario: number;
    nombreUsuario: string;
    detalles: CompraDetalleResponseDTO;
}