import { CompraDetalleRequestDTO } from "./compraDetalleRequestDTO.interface";

export interface CompraRequestDTO{
    idProveedor: number;
    totalCompra: number;
    detalle: CompraDetalleRequestDTO;
}