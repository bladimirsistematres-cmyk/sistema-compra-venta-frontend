import { ProveedorResponseDTO } from "./proveedorResponseDTO.interface";

export interface ProveedorPageResponseDTO{
    proveedores: ProveedorResponseDTO[];
    paginaActual: number;
    totalPaginas: number;
    totalElementos: number;
    tamanioPagina: number;
}