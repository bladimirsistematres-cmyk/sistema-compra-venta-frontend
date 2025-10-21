import { ProveedorListarDTO } from "./proveedorListarDTO.interface";

export interface ProveedorPageListarDTO{
    proveedores: ProveedorListarDTO[];
    paginaActual: number;
    totalPaginas: number;
    totalElementos: number;
    tamanioPagina: number;
}